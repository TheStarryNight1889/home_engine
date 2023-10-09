import { Pool } from 'pg'
import { AirModel } from '../models/air'
import { DeviceModel } from '../models/device'

class DB {
    private dbPool: Pool
    private airModel: AirModel
    private deviceModel: DeviceModel

    private DB_NAME: string = Bun.env.DB_NAME || 'bengine'
    private DB_USER: string = Bun.env.DB_USER || 'bengine'
    private DB_PASSWORD: string = Bun.env.DB_PASSWORD || 'bengine'
    private DB_HOST: string = Bun.env.DB_HOST || 'localhost'
    private DB_PORT: number = Number(Bun.env.DB_PORT) || 5432

    constructor() {
        this.dbPool = new Pool({
            host: this.DB_HOST,
            port: this.DB_PORT,
            database: this.DB_NAME,
            user: this.DB_USER,
            password: this.DB_PASSWORD,
            connectionTimeoutMillis: 5000,
        }); 
        this.airModel = new AirModel(this.dbPool)
        this.deviceModel = new DeviceModel(this.dbPool)
    }

    public getAirModel(): AirModel {
        return this.airModel
    }

    public getDeviceModel(): DeviceModel {
        return this.deviceModel
    }
}

export { DB }
