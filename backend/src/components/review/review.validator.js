const Joi = require('joi');
const commonSchemas = require('../../validators/common.validator');

const createReviewSchema = Joi.object({
  parkingId: commonSchemas.objectId.required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().trim().max(500).allow('').optional()
});

const reviewQuerySchema = commonSchemas.pagination.keys({
  parkingId: commonSchemas.objectId.required()
});

module.exports = {
  createReviewSchema,
  reviewQuerySchema
};
