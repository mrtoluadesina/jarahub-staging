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
      orderId: Joi.string()
        .min(24)
        .max(24)
        .required()
        .error(
          new Error('orderId is required and must be a mongo id of length 24'),
        ),
      productDetailsId: Joi.string()
        .min(24)
        .max(24)
        .required()
        .error(
          new Error(
            'productDetailsId is required and must be a mongo id of length 24',
          ),
        ),
      quantity: Joi.string()
        .pattern(/\d/)
        .min(1)
        .required(),
      cartItems: Joi.array(),
      order: Joi.object(),
      addressId: Joi.string().pattern(/\d/),
    },
  },
  updateStatus: {
    body: {
      status: Joi.boolean()
        .required()
        .error(new Error('status is required and must be a boolean')),
    },
  },
};
