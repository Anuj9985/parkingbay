const app = require('./app');
const env = require('./config/environment');
const connectDatabase = require('./config/database');
const logger = require('./utils/logger');

const startServer = async () => {
  await connectDatabase();

  const server = app.listen(env.PORT, () => {
    logger.info(`🚀 ParkingBay Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    logger.info(`📖 API Docs available at http://localhost:${env.PORT}/api-docs`);
    logger.info(`🩺 Health check at http://localhost:${env.PORT}${env.API_PREFIX}/health`);
  });

  const shutdown = () => {
    logger.info('Shutting down server gracefully...');
    server.close(() => {
      logger.info('Process terminated.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

startServer();
