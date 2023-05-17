import { Http } from './servers/http';
import { DB } from './servers/db';
import { Wss } from './servers/wss';
import { sensorAirRouter } from './routes/sensorAir';

const wss =new Wss(8000);
const db = new DB();
const http = new Http([sensorAirRouter]);


async function bootstrap() {
  await db.start();
  http.start();
  wss.start();
}

bootstrap();