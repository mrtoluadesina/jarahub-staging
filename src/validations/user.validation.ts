import { Joi } from 'celebrate';

export default {
  createUser: {
    body: {
      email: Joi.string().trim().lowercase()
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
      role: Joi.number().valid(1, 2, 3),
      password: Joi.string()
        .min(6)
        .max(100)
        .required()
        .error(new Error('Password does not meet requirements')),
      isActive: Joi.boolean().default(true),
      isVerified: Joi.boolean().default(false),
    },
  },
  updateUser: {
    body: {
      firstName: Joi.string(),
      lastName: Joi.string(),
      DOB: Joi.date().error(new Error('DOB is required')),
      phone: Joi.string().error(new Error('Phone is required')),
      role: Joi.number().valid(1, 2, 3),
      isActive: Joi.boolean(),
      isVerified: Joi.boolean()
    },
  },
  login: {
    body: {
      email: Joi.string().trim().lowercase()
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
