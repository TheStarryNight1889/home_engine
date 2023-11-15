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
        const deviceId = topic.split('/')[1]

        if (topic.includes("sensor/air")) {
            await this.handleSensorAir(deviceId, message)
        }

        if (topic.includes("handshake")) {
            await this.handleDeviceHandshake(deviceId, message)
        }

        if (topic.includes("lwt")) {
            await this.handleDeviceLwt(deviceId, message)
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
                let d: Device = {
                    deviceId: deviceId,
                    deviceType: message.device_type,
                    deviceVersion: message.device_version,
                    connectionStatus: true,
                    lastSeen: new Date(),  
                }
                newDevice = await this.deviceService.updateDevice(deviceId, d)
            } else {
                const d : Device = {
                    deviceId: deviceId,
                    deviceType: message.device_type,
                    deviceVersion: message.device_version,
                    connectionStatus: true,
                    lastSeen: new Date(),

                }
                newDevice = await this.deviceService.createDevice(d)
            }


        }
        catch (err) {
            console.log(err)
        }
    }

    private async handleDeviceLwt(deviceId: string, message: any) {
        try {
            const device = await this.deviceService.getDevice(deviceId)
            let updatedDevice: Device;
            if (device) {
                let d: Device = {
                    deviceId: deviceId,
                    deviceType: device.device_type,
                    deviceVersion: device.device_version,
                    connectionStatus: message.status,
                    lastSeen: new Date(),  
                }
                updatedDevice = await this.deviceService.updateDevice(deviceId, d)
            } else {
                console.log("tried to handle lwt for non-existent device")
            }

        }
        catch (err) {
            console.log(err)
        }
    }
}

export { MqttHandler }