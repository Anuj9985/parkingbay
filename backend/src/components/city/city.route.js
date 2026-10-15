const express = require('express');
const router = express.Router();
const cityController = require('./city.controller');
const { createCitySchema } = require('./city.validator');
const validate = require('../../middlewares/validation.middleware');
const { authenticate, authorize } = require('../../middlewares/auth.middleware');
const { USER_ROLES } = require('../../config/constants');

router.get('/', cityController.listCities);
router.get('/:name', cityController.getCityByName);
router.post(
  '/',
  authenticate,
  authorize(USER_ROLES.ADMIN),
  validate(createCitySchema, 'body'),
  cityController.createCity
);

module.exports = router;
