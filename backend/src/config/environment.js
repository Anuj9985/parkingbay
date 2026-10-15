const dotenv = require('dotenv');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}`;

dotenv.config({ path: path.resolve(process.cwd(), envFile) });
dotenv.config(); // fallback to .env if not found in specific env file

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 5000,
  APP_NAME: process.env.APP_NAME || 'ParkingBay API',
  API_PREFIX: process.env.API_PREFIX || '/api/v1',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/parkingbay',
  JWT_SECRET: process.env.JWT_SECRET || 'parkingbay-super-secret-key-2026',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*'
};
