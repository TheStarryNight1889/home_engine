import { Http } from './servers/http';
import { DB } from './servers/db';
import { Wss } from './servers/wss';
import { sensorAirRouter } from './routes/sensorAir';
import { deviceRouter } from './routes/device';

const db = new DB();
const http = new Http([sensorAirRouter, deviceRouter]);

async function bootstrap() {
  Wss.getInstance().start();
  await db.start();
  http.start();
}

bootstrap();