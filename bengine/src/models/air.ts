import {Pool, PoolClient} from 'pg'

type Air = {
    time: Date
    device_id: string
    temperature: number
    humidity: number
    co2: number
}

class AirModel {
    private db: Pool;

    constructor(db: Pool){
        this.db = db;
    }
    public async getByDeviceId(device_id: string): Promise<Air[]> {
        const client = await this.getClient();
        const res = await client.query(`SELECT * FROM air WHERE device_id = ${device_id}`);
        client.release();
        return res.rows;
    }
    public async create(air: Air): Promise<Air> {
        const client = await this.getClient();
        const res = await client.query(`INSERT INTO air VALUES (
            ${air.time},
            ${air.device_id},
            ${air.temperature},
            ${air.humidity},
            ${air.co2})
        `);
        client.release();
        return res.rows[0];
    }
    private async getClient(): Promise<PoolClient> {
        const client = await this.db.connect();
        return client;
    }

}

export { Air, AirModel }
