const Joi = require('joi');
const { VEHICLE_TYPES, BOOKING_STATUS } = require('../../config/constants');
const commonSchemas = require('../../validators/common.validator');

const createBookingSchema = Joi.object({
  parkingId: commonSchemas.objectId.required(),
  vehicleType: Joi.string().valid(...Object.values(VEHICLE_TYPES)).required(),
  vehicleNumber: Joi.string().trim().uppercase().required(),
  startTime: Joi.date().iso().greater('now').required(),
  endTime: Joi.date().iso().greater(Joi.ref('startTime')).required()
});

const bookingQuerySchema = commonSchemas.pagination.keys({
  status: Joi.string().valid(...Object.values(BOOKING_STATUS)),
  parkingId: commonSchemas.objectId.optional()
});

module.exports = {
  createBookingSchema,
  bookingQuerySchema
};
