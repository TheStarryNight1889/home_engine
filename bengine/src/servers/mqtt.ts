import { MqttClient, connect } from "mqtt";
import { MqttHandler } from '../handlers/mqtt'

class Mqtt {
    private client: MqttClient
    private port: number
    private host: string
    private topics: string[]
    private handler: MqttHandler
    constructor(handler: MqttHandler) {
        this.port = Number(Bun.env.MQTT_PORT) || 1883
        this.host = Bun.env.MQTT_HOST || 'localhost'
        this.client = connect(`mqtt://${this.host}:${this.port}`)
        this.topics = [
            Bun.env.MQTT_SENSOR_AIR || 'data/+/sensor/air',
            Bun.env.MQTT_DEVICE_HANDSHAKE || 'device/+/handshake',
            Bun.env.MQTT_DEVICE_LWT || 'device/+/lwt',
        ]
        this.handler = handler
    }

    public start() {
        console.log('MQTT client started on port', this.port)
        this.client.subscribe(this.topics)
        this.client.on('message', async (topic, message) => {
            await this.handler.handle(topic, JSON.parse(message.toString()))
        })
    }
}

export { Mqtt }