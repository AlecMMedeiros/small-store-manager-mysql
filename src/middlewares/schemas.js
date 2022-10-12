const joi = require('joi');

const productSchema = joi.object().keys({
  name: joi.string().min(5).required().messages({
    'any.required': '"name" is required',
    'string.min': '"name" length must be at least 5 characters long',
  }),
});

module.exports = {
  productSchema,
};