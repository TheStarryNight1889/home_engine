import express from 'express';
import { Air } from '../models/air';
import { Wss } from '../servers/wss';
import { Sequelize, Op, FindOptions } from 'sequelize';

const router = express.Router();

router.post('/sensor/air', async (req, res) => {
    try {
        const wss = Wss.getInstance();
        const data = req.body;
        console.log(data);
        let body = {
          time: new Date(data.timestamp * 1000).toUTCString(),
          device_id: data.device_id,
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
        if (!req.query.deviceId) {
            res.status(400).send("deviceId is required");
            return;
        }
        const deviceId: string = req.query.deviceId as string;
        const startTime: string = req.query.startTime as string;
        const data = await Air.findAll(fiveMinuteAggregationByDevice(deviceId, startTime));
        res.send(data);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

const fiveMinuteAggregationByDevice: (deviceId: string, startTime: string ) => FindOptions<any> = (deviceId: string, startTime: string) => ({
  attributes: [
    [
      Sequelize.literal("time_bucket('5 minutes', time)"),
      'time_bucket',
    ],
    [
      Sequelize.literal("ROUND(AVG(temperature))"),
      'temperature',
    ],
    [
      Sequelize.literal("ROUND(AVG(humidity))"),
      'humidity',
    ],
    [
      Sequelize.literal("ROUND(AVG(co2))"),
      'co2',
    ],
  ],
  where: {
    device_id: deviceId,
    time: {
      [Op.gte]: Sequelize.literal("TIMESTAMP '" + startTime + "'"),
    },
  },
  group: ['time_bucket'],
  order: [['time_bucket', 'ASC']],
});

export { router as sensorAirRouter };