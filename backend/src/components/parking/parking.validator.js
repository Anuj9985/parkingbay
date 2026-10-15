const Joi = require('joi');
const { VEHICLE_TYPES, AMENITIES, PARKING_STATUS } = require('../../config/constants');
const commonSchemas = require('../../validators/common.validator');

const createParkingSchema = Joi.object({
  name: Joi.string().required().trim().min(3).max(100),
  city: Joi.string().required().default('Kolhapur'),
  landmark: Joi.string().required(),
  address: Joi.string().required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
  pricingPerHour: Joi.object({
    car: Joi.number().min(0).default(30),
    two_wheeler: Joi.number().min(0).default(15)
  }).default({ car: 30, two_wheeler: 15 }),
  vehicleTypes: Joi.array()
    .items(Joi.string().valid(...Object.values(VEHICLE_TYPES)))
    .min(1)
    .default(['car', 'two_wheeler']),
  amenities: Joi.array()
    .items(Joi.string().valid(...Object.values(AMENITIES)))
    .default(['open']),
  totalSlots: Joi.object({
    car: Joi.number().integer().min(0).default(50),
    two_wheeler: Joi.number().integer().min(0).default(50)
  }),
  image: Joi.string().allow('').optional(),
  images: Joi.array().items(Joi.string()).optional()
});

const updateParkingSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100),
  city: Joi.string(),
  landmark: Joi.string(),
  address: Joi.string(),
  pricingPerHour: Joi.object({
    car: Joi.number().min(0),
    two_wheeler: Joi.number().min(0)
  }),
  status: Joi.string().valid(...Object.values(PARKING_STATUS)),
  amenities: Joi.array().items(Joi.string().valid(...Object.values(AMENITIES))),
  totalSlots: Joi.object({
    car: Joi.number().integer().min(0),
    two_wheeler: Joi.number().integer().min(0)
  }),
  availableSlots: Joi.object({
    car: Joi.number().integer().min(0),
    two_wheeler: Joi.number().integer().min(0)
  }),
  image: Joi.string().allow(''),
  images: Joi.array().items(Joi.string())
});

const parkingSearchQuerySchema = commonSchemas.pagination.keys({
  city: Joi.string().default('Kolhapur'),
  search: Joi.string().allow('').optional(),
  latitude: Joi.number().min(-90).max(90).optional(),
  longitude: Joi.number().min(-180).max(180).optional(),
  maxDistanceKm: Joi.number().min(0.1).max(50).default(10),
  vehicleType: Joi.string().valid(...Object.values(VEHICLE_TYPES)),
  amenities: Joi.alternatives().try(
    Joi.string().valid(...Object.values(AMENITIES)),
    Joi.array().items(Joi.string().valid(...Object.values(AMENITIES)))
  ),
  status: Joi.string().valid(...Object.values(PARKING_STATUS)),
  sortBy: Joi.string().valid('nearest', 'rating', 'price_asc', 'price_desc').default('nearest')
});

module.exports = {
  createParkingSchema,
  updateParkingSchema,
  parkingSearchQuerySchema
};
