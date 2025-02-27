import { Hono } from 'hono';

const devices = new Hono();

devices.get('/', (c) => {
  return c.json('Get all devices');
});

devices.get('/:id', (c) => {
  const id = c.req.param('id');
  return c.json(`Get device ${id}`);
});

devices.post('/', async (c) => {
  return c.json('Create device', 201);
});

devices.put('/:id', async (c) => {
  const id = c.req.param('id');
  return c.json(`Update device ${id}`);
});

devices.delete('/:id', (c) => {
  const id = c.req.param('id');
  return c.json(`Delete device ${id}`);
});

export default devices;
