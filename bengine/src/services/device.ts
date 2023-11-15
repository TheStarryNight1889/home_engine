import { Device, DeviceModel } from '../models/device'
import { Wss } from '../servers/wss';


class DeviceService {
    private deviceModel: DeviceModel;
    private wss: Wss;

    constructor(deviceModel: DeviceModel) {
        this.deviceModel = deviceModel
        this.wss = Wss.getInstance()
    }

    public async getDevice(deviceId: string): Promise<any | null> {
        return await this.deviceModel.findOne(deviceId)
    }

    public async getDevices(): Promise<Device[]> {
        return await this.deviceModel.get()
    }

    public async createDevice(device: Device): Promise<Device> {
        this.wss.send('device', {data: device,  topic: 'device'})
        return await this.deviceModel.create(device)
    }

    public async updateDevice(deviceId: string, device: Device): Promise<Device> {
        this.wss.send('device', {data: device,  topic: 'device'})
        return await this.deviceModel.update(deviceId, device)
    }
}

export { DeviceService }