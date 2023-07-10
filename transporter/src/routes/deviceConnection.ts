import express from 'express';
import { DeviceConnection } from '../models/deviceConnection';

const router = express.Router();

router.get('/device', async (req, res) => {
    try {
        const deviceConnections = await DeviceConnection.findAll();
        res.send(deviceConnections);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export { router as deviceConnectionRouter };