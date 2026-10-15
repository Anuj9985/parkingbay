const Joi = require('joi');
const commonSchemas = require('../../validators/common.validator');

const addFavoriteSchema = Joi.object({
  parkingId: commonSchemas.objectId.required()
});

module.exports = {
  addFavoriteSchema
};
