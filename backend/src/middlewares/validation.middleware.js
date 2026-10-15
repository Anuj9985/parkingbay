const { ValidationError } = require('../utils/errors');

const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    if (!schema) return next();

    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const details = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/['"]/g, '')
      }));
      return next(new ValidationError('Request validation failed', details));
    }

    req[source] = value;
    next();
  };
};

module.exports = validate;
