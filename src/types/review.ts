import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType,
} from 'graphql';
import { Review } from '../models/reviews.model';

export const ReviewType: GraphQLObjectType<Review> = new GraphQLObjectType({
  name: 'ReviewInput',
  description: 'The review type',
  fields: () => ({
    productId: {
      type: GraphQLString,
      description: 'The product id',
      resolve: parent => parent.productId,
    },
    rating: {
      type: GraphQLInt,
      description: 'The rating number',
      resolve: parent => parent.rating,
    },
    comment: {
      type: GraphQLString,
      description: 'The review comment',
      resolve: parent => parent.comment,
    },
    name: {
      type: GraphQLString,
      description: 'The name of the reviewer',
      resolve: parent => parent.name,
    },
    isVerified: {
      type: GraphQLBoolean,
      description:
        'The review status. If the review is from a verified purchase',
      resolve: parent => parent.isVerfied,
    },
  }),
});

export const ReviewBody = new GraphQLInputObjectType({
  name: 'ReviewinputType',
  description: 'The review input type',
  fields: () => ({
    rating: {
      type: GraphQLInt,
      description: 'The rating number',
    },
    comment: {
      type: GraphQLString,
      description: 'The review comment',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the reviewer',
    },
    isVerified: {
      type: GraphQLBoolean,
      description:
        'The review status. If the review is from a verified purchase',
    },
  }),
});
