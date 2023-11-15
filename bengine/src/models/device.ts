import { Pool, PoolClient } from "pg"
type Device = {
    device_id: string
    device_type: string
    device_version: string
    connection_status: boolean
    last_seen: Date
}

class DeviceModel {
    private db: Pool

    constructor(db: Pool) {
        this.db = db
    }
    public async get(): Promise<any[]> {
        const client = await this.getClient()
        const res = await client.query('SELECT * FROM devices')
        client.release()
        return res.rows
    }
    public async findOne(id: string): Promise<Device | null> {
        const client = await this.getClient()
        const res = await client.query(`SELECT * FROM devices WHERE device_id = '${id}'`)
        client.release()
        return res.rows[0]
    }
    public async create(device: Device): Promise<Device> {
        const client = await this.getClient()
        const queryText = `INSERT INTO devices (device_id, device_type, device_version, connection_status, last_seen) 
                           VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [
            device.device_id,
            device.device_type,
            device.device_version,
            device.connection_status,
            device.last_seen
        ];
        const res = await client.query(queryText, values);
        client.release()
        return res.rows[0]
    }
    public async update(id: string, device: Device): Promise<Device> {
        const client = await this.getClient()
        const queryText = `UPDATE devices SET device_type = $1, device_version = $2, connection_status = $3, last_seen = $4 WHERE device_id = $5 RETURNING *`
        const values = [
            device.device_type,
            device.device_version,
            device.connection_status,
            device.last_seen,
            id
        ]
        const res = await client.query(queryText, values)
        client.release()
        return res.rows[0]
    }
    private async getClient(): Promise<PoolClient> {
        const client = await this.db.connect()
        return client
    }
}

export { Device, DeviceModel }
