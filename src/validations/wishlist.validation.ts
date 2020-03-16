import { Joi } from 'celebrate';

export default {
  create: {
    body: {
      id: Joi.string()
        .min(24)
        .max(24)
        .required()
        .error(new Error('id is required. User was not authenticated')),
      user: Joi.object()
        .required()
        .error(new Error('user was not authenticated')),
      productId: Joi.string()
        .min(24)
        .max(24)
        .required()
        .error(new Error('productId is required. User was not authenticated')),
    },
  },
};
