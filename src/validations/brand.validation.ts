import { Joi } from 'celebrate';

export default {
  create: {
    body: {
      name: Joi.string()
        .required()
        .error(new Error('name is required')),
      logo: Joi.string()
        .required()
        .error(new Error('logo is required')),
    },
  },
};
