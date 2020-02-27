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
        .required()
        .error(
          new Error('name is required and must be more than 2 characters'),
        ),
      description: Joi.string()
        .min(5)
        .required()
        .error(
          new Error(
            'description is required and must be more than 5 charcaters',
          ),
        ),
      categoryId: Joi.array()
        .items(
          Joi.string()
            .min(24)
            .max(24),
        )
        .required()
        .error(
          new Error(
            'categoryId is required and must be an array of mongo ObjectId',
          ),
        ),
      sku: Joi.string()
        .min(4)
        .pattern(new RegExp(/sku.+/, 'i'))
        .required()
        .error(new Error('sku is required and must follow the pattern sku...')),
      specification: Joi.string(),
      quantity: Joi.number()
        .min(1)
        .required()
        .error(new Error('quantity is required and must be greater than one')),
      price: Joi.object()
        .required()
        .error(new Error('price is required and must be an object')),
      images: Joi.array()
        .items(Joi.string())
        .required()
        .error(new Error('images is required and must be an array of string')),
      isDeleted: Joi.boolean().error(new Error('isDeleted must be a boolean')),
      inStock: Joi.boolean().error(new Error('inStock must be a boolean')),
      discountId: Joi.string()
        .min(24)
        .max(24)
        .error(new Error('dicountId must be a mongo ObjectId')),
    },
  },
};
