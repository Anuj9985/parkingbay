const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { registerSchema, loginSchema, refreshTokenSchema } = require('./auth.validator');
const validate = require('../../middlewares/validation.middleware');
const limiter = require('../../middlewares/rateLimit.middleware');

router.post('/register', validate(registerSchema, 'body'), authController.register);
router.post('/login', limiter, validate(loginSchema, 'body'), authController.login);
router.post('/refresh-token', validate(refreshTokenSchema, 'body'), authController.refreshToken);
router.post('/logout', validate(refreshTokenSchema, 'body'), authController.logout);

module.exports = router;
