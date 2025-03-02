import { Elysia } from 'elysia';
import deviceService from '../services/device-service';

export default new Elysia({ name: 'devices', prefix: '/devices' })
  .decorate('deviceService', deviceService)
  .get('/', ({ deviceService }) => {
    return deviceService.getAll();
  })
  .get('/:id', ({ params }) => {
    const { id } = params;
    return `Get device ${id}`;
  })
  .post('/', async () => {
    return new Response(JSON.stringify('Create device'), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  })
  .put('/:id', async ({ params }) => {
    const { id } = params;
    return `Update device ${id}`;
  })
  .delete('/:id', ({ params }) => {
    const { id } = params;
    return `Delete device ${id}`;
  });
