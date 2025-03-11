import sensorAirService from '../services/sensor-air.service';
import { type SensorAirData } from '../db/schema';

export default async function (topic: string, message: Buffer): Promise<void> {
  const topicSegements = topic.split('/');
  const deviceId = topicSegements[3];
  const payload = JSON.parse(message.toString());
  const sensorAirData: Omit<SensorAirData, 'id'> = {
    deviceId: deviceId,
    co2: payload.data?.co2,
    temperature: payload.data?.temperature,
    humidity: payload.data?.humidity,
  };
  await sensorAirService.create(sensorAirData);
}
