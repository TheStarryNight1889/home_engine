interface EntityTimestamps {
  createdAt: string;
  updatedAt: string;
}
export interface SensorAirData {
  id: string;
  deviceId: string;
  temperature: number;
  co2: number;
  humidity: number;
}
export interface Devices {
  id: string;
  locationId: string | null;
  name: string | null;
  type: string;
  version: string;
}

export interface DeviceConnection {
  id: number;
  deviceId: string;
  connected: boolean;
}

export type SensorAirDataEntity = SensorAirData & EntityTimestamps;
export type DevicesEntity = Devices & EntityTimestamps;
export type DeviceConnections = DeviceConnection & EntityTimestamps;
