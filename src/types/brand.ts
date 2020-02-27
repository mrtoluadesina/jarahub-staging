import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
} from 'graphql';

interface Brand {
  name: string;
  logo?: string;
}

export const BrandType: GraphQLObjectType<Brand> = new GraphQLObjectType({
  name: 'BrandType',
  description: 'The type for product brand',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: "The brand's name",
      resolve: parent => parent.name,
    },
    logo: {
      type: GraphQLString,
      description: "The brand's logo",
      resolve: parent => parent.logo,
    },
  }),
});

export const BrandInputType = new GraphQLInputObjectType({
  name: 'BrandInputType',
  description: 'The brand mutation input type',
  fields: () => ({
    name: { type: GraphQLString, description: "The brand's name" },
    logo: { type: GraphQLString, description: "The brand's logo" },
  }),
});
