const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'ParkingBay API Documentation',
    version: '1.0.0',
    description: 'RESTful API for ParkingBay Smart Parking Platform (Kolhapur & beyond)'
  },
  servers: [
    {
      url: 'http://localhost:5000/api/v1',
      description: 'Development Server'
    }
  ],
  paths: {
    '/health': {
      get: {
        summary: 'Check API Health',
        responses: {
          200: { description: 'API is running normally' }
        }
      }
    },
    '/parkings': {
      get: {
        summary: 'List and filter parking spots',
        parameters: [
          { name: 'city', in: 'query', schema: { type: 'string', default: 'Kolhapur' } },
          { name: 'search', in: 'query', schema: { type: 'string' } },
          { name: 'latitude', in: 'query', schema: { type: 'number' } },
          { name: 'longitude', in: 'query', schema: { type: 'number' } },
          { name: 'vehicleType', in: 'query', schema: { type: 'string', enum: ['car', 'two_wheeler'] } },
          { name: 'amenities', in: 'query', schema: { type: 'string', enum: ['covered', 'open', 'ev_charging'] } }
        ],
        responses: {
          200: { description: 'List of matching parking spots' }
        }
      }
    },
    '/parkings/map-pins': {
      get: {
        summary: 'Get map markers with status and coordinates',
        responses: {
          200: { description: 'Map markers list' }
        }
      }
    },
    '/bookings': {
      post: {
        summary: 'Create a parking reservation',
        responses: {
          201: { description: 'Reservation created' }
        }
      }
    }
  }
};

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = setupSwagger;
