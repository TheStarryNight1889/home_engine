import deviceService, { type DeviceCreateInput } from '../services/device.service';
export default async function (topic: string, message: Buffer): Promise<void> {
  const topicSegements = topic.split('/');
  const deviceId = topicSegements[3];
  const payload = JSON.parse(message.toString());

  console.log(`device handshake received for ${deviceId}`);

  const existingDevice = await deviceService.get(deviceId);

  if (!existingDevice) {
    console.log(`device ${deviceId} is not registered`);
    const newDevice: DeviceCreateInput = {
      // the device has a hard coded id
      id: deviceId,
      version: payload.version,
      type: payload.device_type,
      // this info will be set by the user
      locationId: null,
      name: null,
    };

    await deviceService.create(newDevice);
  }
}
