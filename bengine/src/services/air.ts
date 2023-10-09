import { Air, AirModel } from '../models/air';

class AirService {
    private airModel: AirModel; 

    constructor(airModel: AirModel) {
        this.airModel = airModel
    }

    public async getAirs(deviceId: string): Promise<Air[] | null> {
        return await this.airModel.getByDeviceId(deviceId)
    }

    public async createAir(air: any): Promise<Air> {
        return await this.airModel.create(air)
    }
}

export { AirService }