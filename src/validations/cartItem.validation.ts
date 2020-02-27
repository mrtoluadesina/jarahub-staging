import { Joi } from 'celebrate';

export default {
  create: {
    body: {
      // id: Joi.string()
      //   .min(24)
      //   .max(24)
      //   .required()
      //   .error(new Error('id is required. User was not authenticated')),
      // user: Joi.object()
      //   .required()
      //   .error(new Error('user was not authenticated')),
      userId: Joi.string()
        .required()
        .error(new Error('User ID is required')),
      productDetailsId: Joi.string(),
      saveForLater: Joi.boolean(),
      quantity: Joi.string()
        .required()
        .error(new Error('Quantity is required')),
      amount: Joi.number()
        .required()
        .error(new Error('Amount is required')),
    },
  },
};
