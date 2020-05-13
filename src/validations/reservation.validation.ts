import { Joi } from 'celebrate';

export default {
  create: {
    productIds: Joi.array().items({
      quantity: Joi.number().required(),
      productId: Joi.string().pattern(/^[a-fA-F0-9]{24}$/).required()
    }),
    userDetails: Joi.object({
      email: Joi.string().email().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phone: Joi.string().required(),
      address: Joi.string().required()
    }).required()
  }
}