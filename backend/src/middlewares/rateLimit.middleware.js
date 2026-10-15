const rateLimit = require('express-rate-limit');
const appConfig = require('../config/app.config');

const limiter = rateLimit({
  windowMs: appConfig.rateLimit.windowMs,
  max: appConfig.rateLimit.max,
  message: {
    success: false,
    message: appConfig.rateLimit.message
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = limiter;
