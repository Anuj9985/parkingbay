const env = require('./environment');

module.exports = {
  app: {
    name: env.APP_NAME,
    env: env.NODE_ENV,
    port: env.PORT,
    apiPrefix: env.API_PREFIX
  },
  cors: {
    origin: env.CORS_ORIGIN,
    credentials: true
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  },
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedMimes: ['image/jpeg', 'image/png', 'image/webp']
  }
};
