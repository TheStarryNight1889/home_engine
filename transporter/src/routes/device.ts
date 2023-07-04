import express from 'express';
import { Device } from '../models/device';
import { DeviceConnection } from '../models/deviceConnection';

const router = express.Router();

router.post('/device/handshake', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);

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
        }
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export { router as deviceRouter };