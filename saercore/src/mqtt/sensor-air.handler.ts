import { randomUUIDv7 } from 'bun';
import sensorAirService, { type SensorAirDataCreateInput } from '../services/sensor-air.service';

export default async function (topic: string, message: Buffer): Promise<void> {
  const topicSegements = topic.split('/');
  const deviceId = topicSegements[3];
  const payload = JSON.parse(message.toString());
  const sensorAirData: SensorAirDataCreateInput = {
    id: randomUUIDv7(),
    deviceId: deviceId,
    co2: payload.data?.co2,
    temperature: payload.data?.temperature,
    humidity: payload.data?.humidity,
  };
  await sensorAirService.create(sensorAirData);
}
