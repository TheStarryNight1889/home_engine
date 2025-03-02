import { eq } from 'drizzle-orm';
import db from '../db';
import { sensorAirDataTable } from '../db/schema';

export type DeviceData = {
  id: string;
  deviceId: string;
  temperature: number;
  co2: number;
  humidity: number;
  createdAt?: string;
  updatedAt?: string;
};

export type DeviceCreateInput = Omit<DeviceData, 'createdAt' | 'updatedAt'>;
export type DeviceUpdateInput = Partial<Omit<DeviceData, 'id' | 'createdAt' | 'updatedAt'>>;

export class DeviceService {
  async create(data: DeviceCreateInput): Promise<DeviceData> {
    const [result] = await db.insert(sensorAirDataTable).values(data).returning();

    return result;
  }

  async get(id: string): Promise<DeviceData> {
    const [result] = await db
      .select()
      .from(sensorAirDataTable)
      .where(eq(sensorAirDataTable.id, id))
      .limit(1);

    return result;
  }

  async getAll(): Promise<DeviceData[]> {
    return db.select().from(sensorAirDataTable);
  }

  async update(id: string, data: DeviceUpdateInput): Promise<DeviceData> {
    const [result] = await db
      .update(sensorAirDataTable)
      .set({
        ...data,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(sensorAirDataTable.id, id))
      .returning();

    return result;
  }

  async delete(id: string): Promise<DeviceData> {
    const [result] = await db
      .delete(sensorAirDataTable)
      .where(eq(sensorAirDataTable.id, id))
      .returning();

    return result;
  }
}
export default new DeviceService();
