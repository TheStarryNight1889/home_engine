import { Air, AirModel } from '../models/air';
import { Wss } from '../servers/wss';

class AirService {
    private airModel: AirModel; 
    private wss: Wss;

    constructor(airModel: AirModel) {
        this.airModel = airModel
        this.wss = Wss.getInstance()
    }

    public async getAirs(deviceId: string): Promise<Air[] | null> {
        return await this.airModel.getByDeviceId(deviceId)
    }

    public async createAir(air: any): Promise<Air> {
        this.wss.send('sensor-air', {data: air,  topic: 'sensor-air'})
        return await this.airModel.create(air)
    }
}

export { AirService }