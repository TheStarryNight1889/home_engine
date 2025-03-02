import { eq } from 'drizzle-orm';
import db from '../db';
import { sensorAirDataTable } from '../db/schema';

export type SensorAirData = {
  id: string;
  deviceId: string;
  temperature: number;
  co2: number;
  humidity: number;
  createdAt?: string;
  updatedAt?: string;
};

export type SensorAirDataCreateInput = Omit<SensorAirData, 'createdAt' | 'updatedAt'>;
export type SensorAirDataUpdateInput = Partial<Omit<SensorAirData, 'id' | 'createdAt' | 'updatedAt'>>;

export class SensorAirDataService {
  async create(data: SensorAirDataCreateInput): Promise<SensorAirData> {
    const [result] = await db.insert(sensorAirDataTable).values(data).returning();

    return result;
  }

  async get(id: string): Promise<SensorAirData> {
    const [result] = await db.select().from(sensorAirDataTable).where(eq(sensorAirDataTable.id, id)).limit(1);

    return result;
  }

  async getAll(): Promise<SensorAirData[]> {
    return db.select().from(sensorAirDataTable);
  }

  async update(id: string, data: SensorAirDataUpdateInput): Promise<SensorAirData> {
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

  async delete(id: string): Promise<SensorAirData> {
    const [result] = await db.delete(sensorAirDataTable).where(eq(sensorAirDataTable.id, id)).returning();

    return result;
  }
}
export default new SensorAirDataService();