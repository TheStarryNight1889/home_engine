import express from 'express';
import { Device } from '../models/device';
import { DeviceConnection } from '../models/deviceConnection';

const router = express.Router();

router.post('/device/handshake', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        let body = {
          device_id: data.device_id,
          location_id: data.location_id,
          device_type: data.device_type,
          device_version: data.device_version
        }
        if(!await checkDevice(data.device_id)) {
            await Device.create(body);
            await createConnectionStatus(data.device_id);
        }
        else {
            await setConnectionStatus(data.device_id, true);
        }
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

function checkDevice(device_id: string) {
    return Device.findOne({
        where: {
            device_id: device_id
        }
    });
}
function createConnectionStatus(device_id: string) {
    return DeviceConnection.create({
        device_id: device_id,
        status: true
    });
}
function setConnectionStatus(device_id: string, status: boolean) {
    return DeviceConnection.update({
        status: status
    }, {
        where: {
            device_id: device_id
        }
    });
}

export { router as deviceRouter };