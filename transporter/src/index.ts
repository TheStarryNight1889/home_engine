import 'dotenv/config';
import express from 'express';
import WebSocket, { Server as WebSocketServer } from 'ws';
import http from 'http';
import { Sequelize} from 'sequelize';
import { Air, defineAirModel } from './models/Air';

const DB_NAME = process.env.DB_NAME || 'home_engine';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false, // Set this to true if you want to see SQL queries in the console
});

defineAirModel(sequelize);

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());

app.post('/sensor/air', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        await Air.create({
          time: new Date(data.timestamp * 1000),
          device_id: data.device_id,
          location_id: data.location_id,
          temperature: data.data.temperature,
          humidity: data.data.humidity,
          co2: data.data.co2,
        });
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

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to TimescaleDB.');
    await sequelize.sync();
    console.log('Database synchronized.');

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database -- Retrying in 5 seconds');
    setTimeout(async () => {
      await sequelize.authenticate();
      console.log('Connected to TimescaleDB.');
      await sequelize.sync();
      console.log('Database synchronized.');

      server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    }, 5000);
  }
})();