import { Joi } from 'celebrate';

export default {
  createUser: {
    body: {
      email: Joi.string()
        .email()
        .required()
        .error(new Error('Email is required')),
      firstName: Joi.string()
        .required()
        .error(new Error('Firstname is required')),
      lastName: Joi.string()
        .required()
        .error(new Error('Lastname is required')),
      DOB: Joi.date().error(new Error('DOB is required')),
      phone: Joi.string().error(new Error('Phone is required')),
      password: Joi.string()
        .min(6)
        .max(100)
        .required()
        .error(new Error('Password does not meet requirements')),
      isActive: Joi.boolean().default(true),
      isVerified: Joi.boolean().default(false),
    },
  },
  login: {
    body: {
      email: Joi.string()
        .email()
        .required()
        .error(new Error('Email is required')),
      password: Joi.string()
        .min(6)
        .max(20)
        .required()
        .error(new Error('Password required')),
    },
  },
};
