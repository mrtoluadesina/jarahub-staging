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
        .min(2)
        .max(15)
        .required()
        .error(
          new Error(
            'Name is required or does not meet requirements of min 2 and max 15',
          ),
        ),
    },
  },
};
