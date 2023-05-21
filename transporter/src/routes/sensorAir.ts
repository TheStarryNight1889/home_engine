import express from 'express';
import { Air } from '../models/air';
import { Wss } from '../servers/wss';

const router = express.Router();

router.post('/sensor/air', async (req, res) => {
    try {
        const wss = Wss.getInstance();
        const data = req.body;
        console.log(data);
        let body = {
          time: new Date(data.timestamp * 1000),
          device_id: data.device_id,
          location_id: data.location_id,
          temperature: data.data.temperature,
          humidity: data.data.humidity,
          co2: data.data.co2,
        }
        await Air.create(body);
        wss.send({ type: "air", data: body });
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});
router.get('/sensor/air', async (req, res) => {
    try {
        const data = await Air.findAll();
        res.send(data);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export { router as sensorAirRouter };