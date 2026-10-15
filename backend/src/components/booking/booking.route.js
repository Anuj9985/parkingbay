const express = require('express');
const router = express.Router();
const bookingController = require('./booking.controller');
const { createBookingSchema, bookingQuerySchema } = require('./booking.validator');
const validate = require('../../middlewares/validation.middleware');
const { authenticate } = require('../../middlewares/auth.middleware');

router.use(authenticate);

router.post('/', validate(createBookingSchema, 'body'), bookingController.createBooking);
router.get('/my-bookings', validate(bookingQuerySchema, 'query'), bookingController.getUserBookings);
router.get('/:id', bookingController.getBookingById);
router.patch('/:id/cancel', bookingController.cancelBooking);

module.exports = router;
