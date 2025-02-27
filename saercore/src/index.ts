import { Hono } from 'hono';
import devices from './http/devices';

const app = new Hono();

app.route('/devices', devices);

export default {
  port: 3000,
  fetch: app.fetch,
};
