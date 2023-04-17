import 'dotenv/config';

const DB_NAME = process.env.DB_NAME || 'home_engine';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);

const APP_PORT = parseInt(process.env.APP_PORT || '3000', 10);

export { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, APP_PORT };