const Joi = require('joi');

const createCitySchema = Joi.object({
  name: Joi.string().trim().required(),
  tagline: Joi.string().optional(),
  heroImage: Joi.string().uri().allow('').optional(),
  about: Joi.string().optional(),
  centerCoordinates: Joi.array().items(Joi.number()).length(2).required(),
  landmarks: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      description: Joi.string().allow('').optional(),
      image: Joi.string().allow('').optional(),
      coordinates: Joi.array().items(Joi.number()).length(2).required()
    })
  ).optional()
});

module.exports = {
  createCitySchema
};
