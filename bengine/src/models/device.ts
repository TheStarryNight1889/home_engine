import { Pool, PoolClient } from "pg"
type Device = {
    deviceId: string
    deviceType: string
    deviceVersion: string
    connectionStatus: boolean
    lastSeen: Date
}

class DeviceModel {
    private db: Pool

    constructor(db: Pool) {
        this.db = db
    }
    public async get(): Promise<Device[]> {
        const client = await this.getClient()
        const res = await client.query('SELECT * FROM device')
        client.release()
        return res.rows
    }
    public async findOne(id: string): Promise<Device | null> {
        const client = await this.getClient()
        const res = await client.query(`SELECT * FROM device WHERE ${id}`)
        client.release()
        return res.rows[0]
    }
    public async create(device: Device): Promise<Device> {
        const client = await this.getClient()
        const res = await client.query(`INSERT INTO device VALUES (
            ${device.deviceId},
            ${device.deviceType},
            ${device.deviceVersion},
            ${device.connectionStatus},
            ${device.lastSeen})
        `)
        client.release()
        return res.rows[0]
    }
    public async update(id: string, device: Device): Promise<Device> {
        const client = await this.getClient()
        const res = await client.query(`UPDATE device SET
            device_id = ${device.deviceId},
            device_type = ${device.deviceType},
            device_version = ${device.deviceVersion},
            connection_status = ${device.connectionStatus},
            last_seen = ${device.lastSeen}
            WHERE device_id = ${id}
        `)
        client.release()
        return res.rows[0]
    }
    private async getClient(): Promise<PoolClient> {
        const client = await this.db.connect()
        return client
    }
}

export { Device, DeviceModel }
