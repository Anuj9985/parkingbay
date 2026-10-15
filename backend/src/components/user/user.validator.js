const Joi = require('joi');
const { USER_ROLES } = require('../../config/constants');
const commonSchemas = require('../../validators/common.validator');

const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  phone: Joi.string().pattern(/^[0-9+ -]{8,15}$/),
  defaultVehicleType: Joi.string().valid('car', 'two_wheeler'),
  avatar: Joi.string().uri().allow('')
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required()
});

const userQuerySchema = commonSchemas.pagination.keys({
  role: Joi.string().valid(...Object.values(USER_ROLES)),
  search: Joi.string().optional()
});

module.exports = {
  updateUserSchema,
  changePasswordSchema,
  userQuerySchema
};
