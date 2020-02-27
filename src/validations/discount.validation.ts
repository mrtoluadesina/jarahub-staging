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
      name: Joi.string()
        .min(3)
        .required()
        .error(
          new Error(
            'Name is required or does not meet requirements (min 3 and max 10)',
          ),
        ),
      discount: Joi.string()
        .pattern(new RegExp(/\d/))
        .required()
        .error(new Error('Discount is required and must be only numbers')),
      type: Joi.string()
        .pattern(new RegExp(/\bproduct\b|\bcoupon\b/, 'i'))
        .required()
        .error(
          new Error('type is required and must be either Product or Coupon'),
        ),
      valid: Joi.date()
        .min(new Date())
        .required()
        .error(new Error('valid is required and date must be in the future')),
    },
  },
};
