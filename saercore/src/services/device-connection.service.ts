import { eq } from 'drizzle-orm';
import db from '../db';
import {
  deviceConnectionsTable,
  type DeviceConnection,
  type DeviceConnectionEntity,
} from '../db/schema';
export class DeviceConnectionService {
  async create(data: DeviceConnection): Promise<DeviceConnectionEntity> {
    const [result] = await db.insert(deviceConnectionsTable).values(data).returning();

    return result;
  }

  async get(id: string): Promise<DeviceConnectionEntity> {
    const [result] = await db
      .select()
      .from(deviceConnectionsTable)
      .where(eq(deviceConnectionsTable.id, id))
      .limit(1);

    return result;
  }

  async getAll(): Promise<DeviceConnectionEntity[]> {
    return db.select().from(deviceConnectionsTable);
  }

  async update(id: string, data: DeviceConnection): Promise<DeviceConnectionEntity> {
    const [result] = await db
      .update(deviceConnectionsTable)
      .set({
        ...data,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(deviceConnectionsTable.id, id))
      .returning();

    return result;
  }

  async delete(id: string): Promise<DeviceConnectionEntity> {
    const [result] = await db
      .delete(deviceConnectionsTable)
      .where(eq(deviceConnectionsTable.id, id))
      .returning();

    return result;
  }
}
export default new DeviceService();
