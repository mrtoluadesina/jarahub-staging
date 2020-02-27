import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
} from 'graphql';

export const forgotPasswordType = new GraphQLObjectType({
  name: 'ForgotPasswordType',
  description: 'Forgot password object',
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
    token: {
      type: GraphQLString,
      description: 'The response token',
      resolve: parent => parent.token,
    },
  }),
});

export const forgotPasswordInputType = new GraphQLInputObjectType({
  name: 'ForgotPasswordInputType',
  description: 'The forgot password input type',
  fields: () => ({
    email: { type: GraphQLString, description: "The user's email address" },
  }),
});
