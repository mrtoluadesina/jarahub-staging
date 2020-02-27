import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';

export const ProductByCategoryType = new GraphQLObjectType({
  name: 'ProductbyCategoryType',
  description: 'Result type for getting product by category',
  fields: () => ({
    statusCode: {
      type: GraphQLString,
      description: 'The response status code',
      resolve: parent => parent.statusCode,
    },
    message: {
      type: GraphQLString,
      description: 'The response message',
      resolve: parent => parent.message,
    },
    payload: {
      type: new GraphQLList(ProductByCategoryPayload),
      description: 'The response payload',
      resolve: parent => parent.payload,
    },
  }),
});

export const SingleProductType = new GraphQLObjectType({
  name: 'SingleProductType',
  description: 'Result type for getting product by category',
  fields: () => ({
    statusCode: {
      type: GraphQLString,
      description: 'The response status code',
      resolve: parent => parent.statusCode,
    },
    message: {
      type: GraphQLString,
      description: 'The response message',
      resolve: parent => parent.message,
    },
    payload: {
      type: ProductByCategoryPayload,
      description: 'The response payload',
      resolve: parent => parent.payload,
    },
  }),
});

export const ProductByCategoryPayload = new GraphQLObjectType({
  name: 'ProductByCategoryPayload',
  description: 'The product by category payload',
  fields: () => ({
    categoryId: {
      type: new GraphQLList(GraphQLString),
      description: 'The array of category ids',
      resolve: parent => parent.categoryId,
    },
    images: {
      type: new GraphQLList(GraphQLString),
      description: 'The array of product images url',
      resolve: parent => parent.images,
    },
    isDeleted: {
      type: GraphQLBoolean,
      description: 'The delete status',
      resolve: parent => parent.isDeleted,
    },
    isInStock: {
      type: GraphQLBoolean,
      description: 'The stock left ',
      resolve: parent => parent.isInStock,
    },
    tags: {
      type: new GraphQLList(GraphQLString),
      description: 'The tags of the product',
      resolve: parent => parent.tags,
    },
    reviews: {
      type: new GraphQLList(GraphQLString),
      description: 'The review forthis product',
      resolve: parent => parent.reviews,
    },
    name: {
      type: GraphQLString,
      description: 'The name of the product',
      resolve: parent => parent.name,
    },
    description: {
      type: GraphQLString,
      description: 'The description of the product',
      resolve: parent => parent.description,
    },
    sku: {
      type: GraphQLString,
      description: 'The SKU for the product',
      resolve: parent => parent.sku,
    },
    specification: {
      type: GraphQLString,
      description: 'The specification of the product',
      resolve: parent => parent.specification,
    },
    quantity: {
      type: GraphQLInt,
      description: 'The quantity of product left',
      resolve: parent => parent.quantity,
    },
    price: {
      type: GraphQLString,
      description: 'The prices of the product',
      resolve: parent => {
        return JSON.stringify(parent.price);
      },
    },
    discountId: {
      type: GraphQLString,
      description: 'The discount Id attached to the product',
      resolve: parent => parent.discountId,
    },
    brandId: {
      type: GraphQLString,
      description: 'The brand of the product',
      resolve: parent => parent.brandId,
    },
    id: {
      type: GraphQLString,
      description: 'The product id',
      resolve: parent => parent._id,
    },
  }),
});
