import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';

export const CategoryType = new GraphQLObjectType({
  name: 'CategoryType',
  description: 'The category type',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'The category name',
      resolve: parent => parent.name,
    },
    isDeleted: {
      type: GraphQLBoolean,
      description: 'The delete status of the category',
      resolve: parent => parent.isDeleted,
    },
    parents: {
      type: new GraphQLList(GraphQLString),
      description: 'The category parent if any',
      resolve: parent => parent.parents,
    },
    icon: {
      type: GraphQLString,
      description: 'The category icon',
      resolve: parent => parent.icon,
    },
  }),
});

export const CategoryOutput = new GraphQLObjectType({
  name: 'CategoryOutput',
  description: 'The output from getting a category',
  fields: () => ({
    result: {
      type: new GraphQLList(CategoryType),
      description: 'The result',
      resolve: parent => parent,
    },
  }),
});
