const joi = require('joi');

const productSchema = joi.object().keys({
  name: joi.string().min(5).required().messages({
    'any.required': '"name" is required',
    'string.min': '"name" length must be at least 5 characters long',
  }),
});

const saleSchema = joi.object().keys({
  productId: joi.number().integer().required()
    .messages({ 'any.required': '"productId" is required' }),
  quantity: joi.number().integer().min(1).required()
    .messages({
      'any.required': '"quantity" is required',
      'number.min': '"quantity" must be greater than or equal to 1',
    }),
});

module.exports = {
  productSchema,
  saleSchema,
};