const express = require('express');
const router = express.Router();
const parkingController = require('./parking.controller');
const {
  createParkingSchema,
  updateParkingSchema,
  parkingSearchQuerySchema
} = require('./parking.validator');
const validate = require('../../middlewares/validation.middleware');
const { authenticate, authorize } = require('../../middlewares/auth.middleware');
const { USER_ROLES } = require('../../config/constants');

// Public routes (matching the user view)
router.get('/', validate(parkingSearchQuerySchema, 'query'), parkingController.listParkings);
router.get('/map-pins', parkingController.getMapPins);
router.get('/:id', parkingController.getParkingById);

// Protected operator / admin routes
router.post(
  '/',
  authenticate,
  authorize(USER_ROLES.OPERATOR, USER_ROLES.ADMIN),
  validate(createParkingSchema, 'body'),
  parkingController.createParking
);

router.patch(
  '/:id',
  authenticate,
  authorize(USER_ROLES.OPERATOR, USER_ROLES.ADMIN),
  validate(updateParkingSchema, 'body'),
  parkingController.updateParking
);

router.delete(
  '/:id',
  authenticate,
  authorize(USER_ROLES.OPERATOR, USER_ROLES.ADMIN),
  parkingController.deleteParking
);

module.exports = router;
