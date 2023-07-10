import express from 'express';
import { Device } from '../models/device';
import { Wss } from '../servers/wss';
import { DeviceConnection } from '../models/deviceConnection';

const router = express.Router();

router.post('/device/handshake', async (req, res) => {
    try {
        const wss = Wss.getInstance();
        const data = req.body;

        // TODO: this is shit -> create some DTO or something
        let body = {
          device_id: data.device_id,
          device_type: data.device_type,
          device_version: data.device_version
        }

        let [device, created] = await Device.findOrCreate({
            where: { device_id: body.device_id },
            defaults: body
        });

        if(device && created){
            await DeviceConnection.create({ device_id: body.device_id, status: true });
        } else if(device && !created) {
            await DeviceConnection.update({ status: true }, { where: { device_id: body.device_id } });
            wss.send({ type: "deviceConnection", data: { device_id: body.device_id, status: true } });
        }
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.post('/device/lwt', async (req, res) => {
    try{
        const wss = Wss.getInstance();
        const data = req.body;
        await DeviceConnection.update({ status: false }, { where: { device_id: data.device_id } });
        wss.send({ type: "deviceConnection", data: { device_id: data.device_id, status: false } });
        console.log(`device ${data.device_id} lost connection`)
        res.sendStatus(200);
    }catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
})

router.get('/device', async (req, res) => {
    try {
        const devices = await Device.findAll();
        res.send(devices);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export { router as deviceRouter };