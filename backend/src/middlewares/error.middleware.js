const logger = require('../utils/logger');
const ApiResponse = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;

  // Log detailed error
  logger.error(`${error.statusCode} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  if (err.stack) {
    logger.error(err.stack);
  }

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    error.statusCode = 400;
    error.message = `Resource not found with id: ${err.value}`;
  }

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    error.statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    error.message = `Duplicate field value entered: ${field}. Please use another value.`;
  }

  // Handle Mongoose ValidationError
  if (err.name === 'ValidationError') {
    error.statusCode = 422;
    error.message = Object.values(err.errors).map((val) => val.message).join(', ');
  }

  return ApiResponse.error(res, error.message || 'Internal Server Error', error.statusCode, error.details || null);
};

module.exports = errorHandler;
