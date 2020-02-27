import { Joi } from 'celebrate';

export default {
  forgotPassword: {
    body: {
      email: Joi.string()
        .email()
        .required()
        .error(new Error('Valid email is required')),
    },
  },
  resetPassword: {
    body: {
      password: Joi.string()
        .min(6)
        .max(20)
        .required()
        .error(new Error('Password does not meet requirements')),
      id: Joi.string()
        .min(24)
        .max(24)
        .required()
        .error(new Error('id is required. User was not authenticated')),
      user: Joi.object()
        .required()
        .error(new Error('user was not authenticated')),
    },
  },
};
