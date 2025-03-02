import { eq } from 'drizzle-orm';
import db from '../db';
import { devicesTable } from '../db/schema';

export type Device = {
  id: string;
  locationId: string;
  name: string;
  type: string;
  version: string;
  createdAt?: string;
  updatedAt?: string;
};

export type DeviceCreateInput = Omit<Device, 'createdAt' | 'updatedAt'>;
export type DeviceUpdateInput = Partial<Omit<Device, 'id' | 'createdAt' | 'updatedAt'>>;

export class DeviceService {
  async create(data: DeviceCreateInput): Promise<Device> {
    const [result] = await db.insert(devicesTable).values(data).returning();

    return result;
  }

  async get(id: string): Promise<Device> {
    const [result] = await db.select().from(devicesTable).where(eq(devicesTable.id, id)).limit(1);

    return result;
  }

  async getAll(): Promise<Device[]> {
    return db.select().from(devicesTable);
  }

  async update(id: string, data: DeviceUpdateInput): Promise<Device> {
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

  async delete(id: string): Promise<Device> {
    const [result] = await db.delete(devicesTable).where(eq(devicesTable.id, id)).returning();

    return result;
  }
}
export default new DeviceService();
