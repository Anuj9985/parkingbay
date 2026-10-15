const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const env = require('./config/environment');
const appConfig = require('./config/app.config');
const routes = require('./routes');
const errorHandler = require('./middlewares/error.middleware');
const { NotFoundError } = require('./utils/errors');
const setupSwagger = require('./docs/swagger');

const app = express();

// Security HTTP headers
app.use(helmet());

// CORS config
app.use(cors(appConfig.cors));

// JSON & URL-encoded parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// HTTP request logging
if (env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Swagger Documentation
setupSwagger(app);

// Mount API routes
app.use(env.API_PREFIX, routes);

// Ignore browser favicon requests
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Handle undefined routes
app.all('*', (req, res, next) => {
  next(new NotFoundError(`Cannot find ${req.method} ${req.originalUrl} on this server`));
});

// Global error handling middleware
app.use(errorHandler);

module.exports = app;
