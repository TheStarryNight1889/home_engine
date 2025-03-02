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
  })
  .post('/', async ({ body, sensorAirDataService }) => {
    const result = await sensorAirDataService.create(body);
    return new Response(JSON.stringify(result), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  })
  .put('/:id', async ({ params, body, sensorAirDataService }) => {
    const { id } = params;
    return sensorAirDataService.update(id, body as any);
  })
  .delete('/:id', async ({ params, sensorAirDataService }) => {
    const { id } = params;
    return sensorAirDataService.delete(id);
  });
