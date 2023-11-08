import { Air } from "../models/air";
import { Device } from "../models/device";
import { AirService } from "../services/air";
import { DeviceService } from "../services/device";
import { Wss } from "../servers/wss";

class MqttHandler {
    private deviceService: DeviceService;
    private airService: AirService;
    private wss: Wss;
    constructor(deviceService: DeviceService, airService: AirService) {
        this.deviceService = deviceService;
        this.airService = airService;
        this.wss = Wss.getInstance();
    }

    public async handle(topic: string, message: any) {
        const deviceId = topic.split('/')[1]

        if (topic.includes("sensor/air")) {
            await this.handleSensorAir(deviceId, message)
        }

        if (topic.includes("handshake")) {
            await this.handleDeviceHandshake(message, deviceId)
        }

        if (topic.includes("lwt")) {
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
            let newDevice: Device;
            if (device) {
                newDevice = await this.deviceService.updateDevice(deviceId, device)
            } else {
                const d : Device = {
                    deviceId: deviceId,
                    deviceType: message.device_type,
                    deviceVersion: message.device_version,
                    connectionStatus: true,
                    lastSeen: new Date(),

                }
                console.log('creating new device')
                newDevice = await this.deviceService.createDevice(d)
                this.wss.send('device', newDevice)
            }


        }
        catch (err) {
            console.log(err)
        }
    }

    private async handleDeviceLwt(deviceId: string, message: any) {
        try {
            let newDevice = await this.deviceService.updateDevice(deviceId, message)
            this.wss.send('device', newDevice)
        }
        catch (err) {
            console.log(err)
        }
    }
}

export { MqttHandler }