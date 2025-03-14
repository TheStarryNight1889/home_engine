import { sql, type InferSelectModel } from 'drizzle-orm';
import { text, sqliteTable, real, integer } from 'drizzle-orm/sqlite-core';

export const sensorAirDataTable = sqliteTable('sensor_air_data', {
  id: text('id').notNull().primaryKey(),
  deviceId: text('device_id').notNull(),
  temperature: real('temperature').notNull(),
  co2: real('co2').notNull(),
  humidity: real('humidity').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});
export const devicesTable = sqliteTable('devices', {
  id: text('id').notNull().primaryKey(),
  locationId: text('location_id'),
  name: text('name'),
  type: text('type').notNull(),
  version: text('version').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});
export const deviceConnectionsTable = sqliteTable('device_connections', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  deviceId: text('device_id').references(() => devicesTable.id),
  connected: integer({ mode: 'boolean' }).notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export type SensorAirDataEntity = InferSelectModel<typeof sensorAirDataTable>;
export type SensorAirData = Omit<SensorAirDataEntity, 'createdAt' | 'updatedAt'>;

export type DeviceEntity = InferSelectModel<typeof devicesTable>;
export type Device = Omit<DeviceEntity, 'createdAt' | 'updatedAt'>;

export type DeviceConnectionEntity = InferSelectModel<typeof deviceConnectionsTable>;
export type DeviceConnection = Omit<DeviceConnectionEntity, 'createdAt' | 'updatedAt'>;
