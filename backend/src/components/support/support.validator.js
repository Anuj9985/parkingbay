const Joi = require('joi');

const createTicketSchema = Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string().email().required(),
  subject: Joi.string().required().trim(),
  message: Joi.string().required().trim()
});

module.exports = {
  createTicketSchema
};
