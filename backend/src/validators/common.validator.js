const Joi = require('joi');

const commonSchemas = {
  objectId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .message('Invalid MongoDB ObjectId'),

  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(10),
    sort: Joi.string().optional(),
    order: Joi.string().valid('asc', 'desc').default('desc')
  })
};

module.exports = commonSchemas;
