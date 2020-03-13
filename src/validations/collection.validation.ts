import { Joi } from 'celebrate';

export default {
  create: {
    body: {
      productIds: Joi.array()
        .items(
          Joi.string()
            .min(24)
            .max(24),
        )
        .required()
        .error(new Error('productIds is required and must be mongo ObjectID')),
      name: Joi.string()
        .required()
        .error(new Error('Collection name is required')),
      image: Joi.string()
        .required()
        .error(new Error('Collection image is required')),
      priority: Joi.string()
        .required()
        .error(new Error('Collection priority is required and must be 0 or 1')),
    },
  },
};
