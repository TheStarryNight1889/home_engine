import { eq } from 'drizzle-orm';
import db from '../db';
import { devicesTable, type Device, type DeviceEntity } from '../db/schema';
export class DeviceService {
  async create(data: Device): Promise<DeviceEntity> {
    const [result] = await db.insert(devicesTable).values(data).returning();

    return result;
  }

  async get(id: string): Promise<DeviceEntity> {
    const [result] = await db.select().from(devicesTable).where(eq(devicesTable.id, id)).limit(1);

    return result;
  }

  async getAll(): Promise<DeviceEntity[]> {
    return db.select().from(devicesTable);
  }

  async update(id: string, data: Device): Promise<DeviceEntity> {
    const [result] = await db
      .update(devicesTable)
      .set({
        ...data,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(devicesTable.id, id))
      .returning();

    return result;
  }

  async delete(id: string): Promise<DeviceEntity> {
    const [result] = await db.delete(devicesTable).where(eq(devicesTable.id, id)).returning();

    return result;
  }
}
export default new DeviceService();
