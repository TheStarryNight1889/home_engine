import { Http } from './servers/http'
import { DB } from './servers/db'
import { Wss } from './servers/wss'
import { sensorAirRouter } from './routes/sensorAir'
import { deviceRouter } from './routes/device'
import { deviceConnectionRouter } from './routes/deviceConnection'

const db = new DB()
const http = new Http([sensorAirRouter, deviceRouter, deviceConnectionRouter])

async function bootstrap() {
    Wss.getInstance()
    await db.start()
    http.start()
}

bootstrap()
