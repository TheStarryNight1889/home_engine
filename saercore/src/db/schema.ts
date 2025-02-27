import { sql } from 'drizzle-orm';
import { text, sqliteTable, real } from 'drizzle-orm/sqlite-core';

export const sensorAirDataTable = sqliteTable('sensor_air_data', {
  id: text('id').notNull(),
  deviceId: text('device_id').notNull(),
  temperature: real('temperature').notNull(),
  co2: real('co2').notNull(),
  humidity: real('humidity').notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`),
});
