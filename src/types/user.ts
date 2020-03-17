import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
} from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';
import { IUser } from '../models/user.model';

export interface IUserInterface {
  statusCode: number;
  message: string;
  payload?: IUser;
  token?: string;
}

export const UserType: GraphQLObjectType<IUser> = new GraphQLObjectType({
  name: 'UserType',
  description: 'The user model type',
  fields: () => ({
    email: {
      type: GraphQLString,
      description: "The user's email address",
      resolve: ({ email }) => email,
    },
    firstName: {
      type: GraphQLString,
      description: "The user's first name",
      resolve: ({ firstName }) => firstName,
    },
    lastName: {
      type: GraphQLString,
      description: "The user's last name",
      resolve: ({ lastName }) => lastName,
    },
    DOB: {
      type: GraphQLDate,
      description: 'The date of birth of this user',
      resolve: ({ DOB }) => DOB,
    },
    phone: {
      type: GraphQLString,
      description: "The user's phone number",
      resolve: ({ phone }) => phone,
    },
    password: {
      type: GraphQLString,
      description: "The user's password",
      resolve: ({ password }) => password,
    },
    isDeleted: {
      type: GraphQLBoolean,
      description: 'Flag to detect deleted accounts',
      resolve: ({ isDeleted }) => isDeleted,
    },
    isActive: {
      type: GraphQLBoolean,
      description: 'Flag to detect active accounts',
      resolve: ({ isActive }) => isActive,
    },
    isVerified: {
      type: GraphQLBoolean,
      description: 'Flag to detect verified account',
      resolve: ({ isVerified }) => isVerified,
    },
    id: {
      type: GraphQLString,
      description: 'The user id',
      resolve: ({ _id }) => _id,
    },
  }),
});

export const UserInputType = new GraphQLInputObjectType({
  name: 'UserInputType',
  description: 'The user model type',
  fields: () => ({
    email: {
      type: GraphQLString,
      description: "The user's email address",
    },
    firstName: {
      type: GraphQLString,
      description: "The user's first name",
    },
    lastName: {
      type: GraphQLString,
      description: "The user's last name",
    },
    DOB: {
      type: GraphQLString,
      description: 'The date of birth of this user',
    },
    phone: {
      type: GraphQLString,
      description: "The user's phone number",
    },
    password: {
      type: GraphQLString,
      description: "The user's password",
    },
    isDeleted: {
      type: GraphQLBoolean,
      description: 'Flag to detect deleted accounts',
    },
    isActive: {
      type: GraphQLBoolean,
      description: 'Flag to detect active accounts',
    },
    isVerified: {
      type: GraphQLBoolean,
      description: 'Flag to detect verified account',
    },
  }),
});

export const UserResponseType = new GraphQLObjectType({
  name: 'userResponseType',
  description: 'The response from user mutation',
  fields: () => ({
    message: {
      type: GraphQLString,
      description: 'The sign up response message',
    },
    token: {
      type: GraphQLString,
      description: 'The user token',
    },
  }),
});

export const UserLoginType: GraphQLObjectType<
  IUserInterface
> = new GraphQLObjectType({
  name: 'UserLoginType',
  description: "The user's login type",
  fields: () => ({
    statusCode: { type: GraphQLInt, description: 'The response status code' },
    message: { type: GraphQLString, description: 'The response message' },
    payload: {
      type: UserType,
      description: "The login payload containing user's data",
    },
    token: { type: GraphQLString, description: "The user's access token" },
  }),
});
