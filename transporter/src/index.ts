import { Http } from './servers/http';
import { DB } from './servers/db';
import { sensorAirRouter } from './routes/sensorAir';

const db = new DB();
const http = new Http([sensorAirRouter]);

async function bootstrap() {
  await db.start();
  http.start();
}

bootstrap();