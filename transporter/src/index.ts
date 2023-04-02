import 'dotenv/config';
import express from 'express';
import WebSocket, { Server as WebSocketServer } from 'ws';
import http from 'http';
import {InfluxDB, Point} from'@influxdata/influxdb-client'

const token = process.env.INFLUXDB_TOKEN || 'NiceToken'
const url = process.env.INFLUXDB_URL || 'http://localhost:8086'
const bucket = process.env.INFLUXDB_BUCKET || 'my-bucket'
const org = process.env.INFLUXDB_ORG || 'my-org'

const iclient = new InfluxDB({url, token})

let writeClient = iclient.getWriteApi(org, bucket, 'ns')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/sensor/air', async (req, res) => {
    try {
        const data = req.body;
        const point = new Point('air')
        .timestamp(new Date(req.body.timestamp *1000))
        .tag('device_id', data.device_id)
        .tag('location_id', data.location_id)
        .floatField('temperature', data.data.temperature)
        .floatField('humidity', data.data.humidity)
        .floatField('co2', data.data.co2);
        writeClient.writePoint(point);
        await writeClient.flush();
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(req.body));
            }
        });
      res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

const server = http.createServer(app);

const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', (socket) => {
  console.log('WebSocket client connected.');

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  socket.on('close', () => {
    console.log('WebSocket client disconnected.');
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
