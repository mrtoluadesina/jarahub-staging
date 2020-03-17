import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
} from 'graphql';

export const CollectionInputType = new GraphQLInputObjectType({
  name: 'CollectionInputType',
  description: 'The input requirements for creating collections',
  fields: () => ({
    productIds: {
      type: new GraphQLList(GraphQLString),
      description: 'The ids of products in the collection',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the collection',
    },
    image: {
      type: GraphQLString,
      description: 'The banner image for the collection',
    },
    description: {
      type: GraphQLString,
      description: 'The description of the collection',
    },
    priority: {
      type: GraphQLInt,
      description: 'The priority of the collection o or 1',
    },
  }),
});

export const CollectionType = new GraphQLObjectType({
  name: 'CollectionType',
  description: 'The mutaion return type for collection',
  fields: () => ({
    statusCode: {
      type: GraphQLInt,
      description: 'The request response status code',
      resolve: parent => parent.statusCode,
    },
    message: {
      type: GraphQLString,
      description: 'The response message',
      resolve: parent => parent.message,
    },
    error: {
      type: GraphQLString,
      description: 'The error message if any',
      resolve: parent => parent.error,
    },
    token: {
      type: GraphQLString,
      description: 'The response token if required',
      resolve: parent => parent.token,
    },
    payload: {
      type: CollectionPayload,
      description: 'The response payload',
      resolve: parent => parent.payload,
    },
  }),
});

export const CollectionPayload = new GraphQLObjectType({
  name: 'CollectioPayload',
  description: 'A single collection object',
  fields: () => ({
    productIds: {
      type: new GraphQLList(GraphQLString),
      description: 'The ids of products in the collection',
      resolve: parent => parent.productIds,
    },
    name: {
      type: GraphQLString,
      description: 'The name of the collection',
      resolve: parent => parent.name,
    },
    image: {
      type: GraphQLString,
      description: 'The banner image for the collection',
      resolve: parent => parent.image,
    },
    description: {
      type: GraphQLString,
      description: 'The description of the collection',
      resolve: parent => parent.description,
    },
    priority: {
      type: GraphQLInt,
      description: 'The priority of the collection o or 1',
      resolve: parent => parent.priority,
    },
  }),
});
