import { Joi } from 'celebrate';

export default {
  create: {
    body: {
      tag: Joi.string()
        .min(2)
        .required()
        .error(new Error('tag is required and must be a min of 2 characters')),
    },
  },
};
