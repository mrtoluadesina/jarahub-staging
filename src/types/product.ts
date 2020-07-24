import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import { ReviewType } from './review';

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

export const ProductByCategoryWithPaginationType = new GraphQLObjectType({
  name: 'ProductByCategoryWithPaginationType',
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
      type: ProductCategoryWithPagination,
      description: 'The response payload',
      resolve: parent => parent.payload,
    },
  }),
});

export const ProductCategoryWithPagination = new GraphQLObjectType({
  name: 'ProductCategoryWithPagination',
  description: 'Payload for category with pagination',
  fields: () => ({
    data: {
      type: new GraphQLList(ProductByCategoryPayload),
      description: 'The main payload',
    },
    count: { type: GraphQLInt, description: 'The total result count' },
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
      type: new GraphQLList(BrandCategoryType),
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
      type: new GraphQLList(ReviewType),
      description: 'The review for this product',
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
      type: BrandCategoryType,
      description: 'The brand of the product',
      resolve: parent => parent.brandId,
    },
    id: {
      type: GraphQLString,
      description: 'The product id',
      resolve: parent => parent._id,
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The URL Slug',
      resolve: parent => parent.slug,
    },
    categoryNames: {
      type: new GraphQLList(GraphQLString),
      description: 'The categories the product can be found in',
      resolve: parent => parent.categoryNames,
    },
  }),
});

export const BrandCategoryType = new GraphQLObjectType({
  name: 'BarndType',
  description: 'The product brand type',
  fields: () => ({
    _id: { type: GraphQLString, description: 'The brand Id' },
    name: { type: GraphQLString, description: 'The brand name' },
  }),
});
