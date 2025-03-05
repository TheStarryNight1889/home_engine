import { Elysia } from 'elysia';
import sensorAirDataService from '../services/sensor-air.service';

export default new Elysia({ name: 'sensor-airs', prefix: '/sensor/airs' })
  .decorate('sensorAirDataService', sensorAirDataService)
  .get('/', ({ sensorAirDataService }) => {
    return sensorAirDataService.getAll();
  })
  .get('/:id', async ({ params, sensorAirDataService }) => {
    const { id } = params;
    return sensorAirDataService.get(id);
  });
