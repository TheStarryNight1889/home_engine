import { Air } from "../models/air";
import { Device } from "../models/device";
import { AirService } from "../services/air";
import { DeviceService } from "../services/device";

class MqttHandler {
    private deviceService: DeviceService;
    private airService: AirService;
    constructor(deviceService: DeviceService, airService: AirService) {
        this.deviceService = deviceService;
        this.airService = airService;
    }

    public async handle(topic: string, message: any) {
        console.log('Handling new MQTT message: ', topic, message)

        const deviceId = topic.split('/')[1]

        if (topic === Bun.env.MQTT_SENSOR_AIR) {
            await this.handleSensorAir(message, deviceId)
        }

        if (topic === Bun.env.MQTT_DEVICE_HANDSHAKE) {
            await this.handleDeviceHandshake(message, deviceId)
        }

        if (topic === Bun.env.MQTT_DEVICE_LWT) {
            await this.handleDeviceLwt(message, deviceId)
        }
    }

    private async handleSensorAir(deviceId: string, message: any) {
        try {
            const air: Air = {
                device_id: deviceId,
                // message.timestamp is epoch time in seconds
                time: new Date(message.timestamp * 1000),
                temperature: message.data.temperature,
                humidity: message.data.humidity,
                co2: message.data.co2,
            }
            await this.airService.createAir(air)
        } catch (err) {
            console.log(err)
        }
    }

    private async handleDeviceHandshake(deviceId: string, message: any) {
        try {
            const device = await this.deviceService.getDevice(deviceId)
            if (device) {
                await this.deviceService.updateDevice(deviceId, device)
            } else {
                const d : Device = {
                    deviceId: deviceId,
                    deviceType: message.device_type,
                    deviceVersion: message.device_version,
                    connectionStatus: true,
                    lastSeen: new Date(),

                }
                await this.deviceService.createDevice(d)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    private async handleDeviceLwt(deviceId: string, message: any) {
        try {
            await this.deviceService.updateDevice(deviceId, message)
        }
        catch (err) {
            console.log(err)
        }
    }
}

export { MqttHandler }