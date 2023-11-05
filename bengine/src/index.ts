import { Http } from './servers/http'
import { DB } from './servers/db'
import { Wss } from './servers/wss'
import { Mqtt } from './servers/mqtt'

import { AirController } from './controllers/air'
import { DeviceController } from './controllers/device'

import { DeviceService } from './services/device'
import { AirService } from './services/air'

import { MqttHandler } from './handlers/mqtt'

const db = new DB()

const airModel = db.getAirModel()
const deviceModel = db.getDeviceModel()

const deviceService = new DeviceService(deviceModel)
const airService = new AirService(airModel)

const mqttHandler = new MqttHandler(
    deviceService,
    airService
)
const mqtt = new Mqtt(mqttHandler)

const deviceController = new DeviceController(deviceService)
const airController = new AirController(airService)

const http = new Http([deviceController, airController])

async function bootstrap() {
    mqtt.start()
    http.start()
}

bootstrap()
