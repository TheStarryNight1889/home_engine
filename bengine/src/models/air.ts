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
    public async getByDeviceId(device_id: string, startTime: string): Promise<Air[]> {
        const client = await this.getClient();
        const res = await client.query(`SELECT * FROM airs WHERE device_id = '${device_id}' AND time > '${startTime}' ORDER BY time ASC`);
        client.release();
        return res.rows;
    }
    public async create(air: Air): Promise<Air> {
        const client = await this.getClient();
        const queryText = `INSERT INTO airs (time, device_id, temperature, humidity, co2) 
                           VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [
            air.time,
            air.device_id,
            air.temperature,
            air.humidity,
            air.co2,
        ];
        const res = await client.query(queryText, values);
        client.release();
        return res.rows[0];
    }
    private async getClient(): Promise<PoolClient> {
        const client = await this.db.connect();
        return client;
    }

}

export { Air, AirModel }
