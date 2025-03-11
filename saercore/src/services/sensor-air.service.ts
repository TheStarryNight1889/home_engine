import { eq } from 'drizzle-orm';
import db from '../db';
import { randomUUIDv7 } from 'bun';
import { sensorAirDataTable, type SensorAirData, type SensorAirDataEntity } from '../db/schema';

export class SensorAirDataService {
  async create(data: Omit<SensorAirData, 'id'>): Promise<SensorAirDataEntity> {
    const dataWithId: SensorAirData = { ...data, id: randomUUIDv7() };
    const [result] = await db.insert(sensorAirDataTable).values(dataWithId).returning();

    return result;
  }

  async get(id: string): Promise<SensorAirDataEntity> {
    const [result] = await db
      .select()
      .from(sensorAirDataTable)
      .where(eq(sensorAirDataTable.id, id))
      .limit(1);

    return result;
  }

  async getAll(): Promise<SensorAirDataEntity[]> {
    return db.select().from(sensorAirDataTable);
  }
}
export default new SensorAirDataService();
