import { Http } from './servers/http';
import { DB } from './servers/db';
import { Wss } from './servers/wss';
import { sensorAirRouter } from './routes/sensorAir';

const db = new DB();
const http = new Http([sensorAirRouter]);

async function bootstrap() {
  Wss.getInstance().start();
  await db.start();
  http.start();
}

bootstrap();