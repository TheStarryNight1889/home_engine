import { Device, DeviceModel } from '../models/device'

class DeviceService {
    private deviceModel: DeviceModel; 

    constructor(deviceModel: DeviceModel) {
        this.deviceModel = deviceModel
    }

    public async getDevice(deviceId: string): Promise<Device | null> {
        return await this.deviceModel.findOne(deviceId)
    }

    public async getDevices(): Promise<Device[]> {
        return await this.deviceModel.get()
    }

    public async createDevice(device: Device): Promise<Device> {
        return await this.deviceModel.create(device)
    }

    public async updateDevice(deviceId: string, device: Device): Promise<Device> {
        return await this.deviceModel.update(deviceId, device)
    }
}

export { DeviceService }