import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';

export const WishListInputtype = new GraphQLInputObjectType({
  name: 'WishlistInputType',
  description: 'The wishlist request body',
  fields: () => ({
    productId: { type: GraphQLString, description: 'The product id' },
  }),
});

export const WishListtype = new GraphQLObjectType({
  name: 'WishlistType',
  description: 'The wishlist request body',
  fields: () => ({
    productId: { type: GraphQLString, description: 'The product id' },
    userId: { type: GraphQLString, description: 'The user id' },
    createdAt: {
      type: GraphQLDate,
      description: 'The date wishlist was created',
    },
  }),
});

export const WishlistResponseType = new GraphQLObjectType({
  name: 'WishlistResponseType',
  description: 'The response payload for wishlist',
  fields: () => ({
    statusCode: {
      type: GraphQLInt,
      description: 'The response status code',
      resolve: parent => parent.statusCode,
    },
    message: {
      type: GraphQLString,
      description: 'The response message',
      resolve: parent => parent.message,
    },
    error: {
      type: GraphQLString,
      description: 'The response error message if any',
      resolve: parent => parent.error,
    },
    token: {
      type: GraphQLString,
      description: 'The response token',
      resolve: parent => parent.token,
    },
    payload: {
      type: WishListtype || new GraphQLList(WishListtype),
      description: 'The response payload',
      resolve: parent => parent.payload,
    },
  }),
});
