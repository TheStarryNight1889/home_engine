import { Elysia } from 'elysia';
import devices from './http/devices.route';
import sensorAirs from './http/sensor-airs.route';
import swagger from '@elysiajs/swagger';
import sensorAirHandler from './mqtt/sensor-air.handler';
import MqttService from './mqtt/client';

const mqttService = new MqttService();
mqttService.registerHandler('data/sensor/air/+', sensorAirHandler);

const app = new Elysia()
  .state('startTime', 0)
  .onRequest(({ store }) => {
    store.startTime = Date.now();
  })
  .onAfterResponse(({ request, set, store }) => {
    const elapsed = Date.now() - store.startTime;
    const method = request.method;
    const url = new URL(request.url).pathname;
    const status = set.status || 200;
    console.log(`[${new Date().toISOString()}] ${method} ${url} - ${status} ${elapsed}ms`);
  })
  .use(swagger())
  .use(devices)
  .use(sensorAirs)
  .listen(3000);
console.log(`saercore is running at ${app.server?.hostname}:${app.server?.port}`);
