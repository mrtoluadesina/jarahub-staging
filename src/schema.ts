import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import {
  OrderType,
  OrderInputType,
  UserOrderType,
  UpdateStatusType,
  UpdateStatusInputType,
} from './types/order';

import sampleController from './controllers/sample';
import SampleType from './types/sample';

//Orders
import {
  getOrder,
  getUserOrder,
  changeOrderStatus,
  createOrder,
} from './controllers/order.controller';
import { getAllUsers, Signup, Login } from './controllers/user.controller';
import { createForgotPassword } from './controllers/auth.controller';
import { UserType, UserResponseType, UserLoginType } from './types/user';
import { forgotPasswordType } from './types/auth';
import {
  create as createBrand,
  deleteBrand,
  getBrands,
  getSingleBrand,
} from './controllers/brand.controller';
import { BrandType } from './types/brand';
import {
  create as createReview,
  getProductReview,
} from './controllers/review.controller';
import { ReviewType, ReviewBody } from './types/review';
import { CategoryOutput } from './types/category';
import { GetAllCategories } from './controllers/category.controller';
import {
  ProductByCategoryType,
  SingleProductType,
  ProductByCategoryPayload,
  ProductByCategoryWithPaginationType,
} from './types/product';
import {
  filterByCategory,
  GetASingleProduct,
  getAllProducts,
  getAllProductsPaginated,
  getProductsByCategoryWithPagination,
  search,
} from './controllers/product.controller';

import { Create as createCollection } from './controllers/collection.controller';

import { decodeToken } from './middlewares/userAuth';
import { CollectionInputType, CollectionType } from './types/collection';

import {
  Create as createWishlist,
  Delete as deleteWishlist,
  GetUserWishlist,
  GetWishlist,
} from './controllers/wishlist.controller';
import {
  WishListInputtype,
  WishlistResponseType,
  WishListtype,
} from './types/wishlist';

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'The query root of Nert.',
  fields: () => ({
    sample: {
      type: SampleType,
      description: 'A sample root schema',
      resolve: () => sampleController(),
    },
    getOrders: {
      type: OrderType,
      description: 'All orders made',
      args: { id: { type: GraphQLID } },
      resolve: async (_, { id }) => {
        const result = await getOrder(id);
        return result;
      },
    },
    getUserOrder: {
      type: new GraphQLList(UserOrderType),
      description: 'Get order belonging to a particular user',
      args: { userId: { type: GraphQLID, description: 'The users id' } },
      resolve: async (_, { userId }) => {
        const orders = await getUserOrder(userId);
        return orders.payload;
      },
    },
    getAllUsers: {
      type: new GraphQLList(UserType),
      description: 'Get all users',
      resolve: async () => {
        const result = await getAllUsers();
        return result;
      },
    },
    getMe: {
      type: UserType,
      description: 'Get a Logged in user',
      args: {
        userToken: {
          type: GraphQLString,
          description: "The logged in user's token",
        },
      },
      resolve: async (_, { userToken }) => {
        const user = await decodeToken(userToken);
        return user;
      },
    },
    getBrands: {
      type: BrandType,
      description: 'Query to get all brands',
      resolve: () => getBrands(),
    },
    getSingleBrand: {
      type: BrandType,
      description: 'Query to get single type',
      args: { id: { type: GraphQLString, description: 'The brand id' } },
      resolve: async (_, { id }) => await (await getSingleBrand(id)).payload,
    },
    getProductReview: {
      type: ReviewType,
      description: 'The review type',
      args: {
        productId: { type: GraphQLString, description: "The product's id" },
      },
      resolve: async (_, { productId }) => await getProductReview(productId),
    },
    getCategories: {
      type: CategoryOutput,
      description: 'The query to get all categories',
      resolve: async () => {
        const res = await GetAllCategories();
        return res;
      },
    },
    getProductsByCategory: {
      type: ProductByCategoryType,
      description: 'The query to get products by category',
      args: {
        query: {
          type: GraphQLString,
          description: 'The product category to search for',
        },
      },
      resolve: async (_, { query }) => await filterByCategory(query),
    },
    getSingleProduct: {
      type: SingleProductType,
      description: 'Get a single product detail',
      args: {
        productId: {
          type: GraphQLString,
          description: 'The product name or ID',
        },
      },
      resolve: async (_, { productId }) => await GetASingleProduct(productId),
    },
    getProduct: {
      type: new GraphQLList(ProductByCategoryPayload),
      description: 'Get all products',
      resolve: async () => await getAllProducts(),
    },
    getProductWithPagination: {
      type: ProductByCategoryType,
      description: 'Get the product in paginated format',
      args: {
        pageNumber: {
          type: GraphQLInt,
          description: 'The current page number',
        },
      },
      resolve: async (_, { pageNumber }) =>
        await getAllProductsPaginated(pageNumber),
    },
    getProductByCategoryWithPagination: {
      type: ProductByCategoryWithPaginationType,
      description: 'Get all this products in a category in a paginated format',
      args: {
        pageNumber: {
          type: GraphQLInt,
          description: 'The page number to be gotten',
        },
        filterParam: { type: GraphQLString, description: 'The category' },
      },
      resolve: async (_, { pageNumber, filterParam }) =>
        await getProductsByCategoryWithPagination(pageNumber, filterParam),
    },
    searchProducts: {
      type: ProductByCategoryType,
      description: 'Query to search products',
      args: {
        searchQuery: {
          type: GraphQLString,
          description: 'The query to search for',
        },
      },
      resolve: async (_, { searchQuery }) => await search(searchQuery),
    },
    getWishlist: {
      type: new GraphQLList(WishListtype),
      description: 'Get all wish list item',
      resolve: async () => await GetWishlist(),
    },
    getUserWishlist: {
      type: WishlistResponseType,
      description: 'The wishlist belonging to a particular user',
      args: { userId: { type: GraphQLString, description: 'The user id' } },
      resolve: async (_, { userId }) => await GetUserWishlist(userId),
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The mutation root',
  fields: () => ({
    createOrder: {
      type: OrderType,
      description: 'To create an order',
      args: {
        userId: { type: GraphQLString },
        input: { type: OrderInputType },
      },
      resolve: async (_, { userId, input }) => await createOrder(userId, input),
    },
    updateOrderStatus: {
      type: UpdateStatusType,
      description: 'To update order status',
      args: {
        input: {
          type: UpdateStatusInputType,
          description: 'The update status input',
        },
      },
      resolve: async (_, { input }) =>
        await changeOrderStatus(input.orderId, input.status),
    },
    registerUser: {
      type: UserResponseType,
      description: 'Register user',
      args: {
        firstName: { type: GraphQLString, description: 'The user first name' },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (_, { firstName, lastName, email, phone, password }) =>
        await Signup({ firstName, lastName, email, phone, password }),
    },
    loginUser: {
      type: UserLoginType,
      description: 'Mutation for the user login',
      args: {
        email: { type: GraphQLString, description: "The user's email address" },
        password: { type: GraphQLString, description: "The user's password" },
      },
      resolve: async (_, { email, password }) =>
        await Login({ email, password }),
    },
    forgotPassword: {
      type: forgotPasswordType,
      description: 'Mutation for forgot password',
      args: {
        email: { type: GraphQLString, description: "The user's email address" },
      },
      resolve: async (_, { email }) => await createForgotPassword({ email }),
    },
    createBrand: {
      type: BrandType,
      description: 'The brand input type',
      args: {
        name: { type: GraphQLString, description: 'The brand name' },
        logo: { type: GraphQLString, description: 'The brand logo' },
      },
      resolve: async (_, { name, logo }) =>
        await (await createBrand({ name, logo })).payload,
    },
    deleteBrand: {
      type: BrandType,
      description: 'Mutation to delete brand',
      args: { id: { type: GraphQLString, description: 'The brand id' } },
      resolve: async (_, { id }) => await (await deleteBrand(id)).payload,
    },
    createReview: {
      type: ReviewType,
      description: 'Mutation to create review',
      args: {
        reviewBody: {
          type: ReviewBody,
          description: 'The review details',
        },
        productId: {
          type: GraphQLString,
          description: 'The product id for review',
        },
      },
      resolve: async (_, { reviewBody, productId }) =>
        await (await createReview(reviewBody, productId)).payload,
    },
    createCollection: {
      type: CollectionType,
      description: 'Mutation for creating collection',
      args: {
        body: { type: CollectionInputType, description: 'The collection body' },
      },
      resolve: async (_, { body }) => await createCollection(body),
    },
    createWishlist: {
      type: WishlistResponseType,
      description: 'Mutation to create wishlist',
      args: {
        body: { type: WishListInputtype, description: 'The wishlist details' },
      },
      resolve: async (_, { body }) => await createWishlist(body),
    },
    deleteWishlist: {
      type: WishlistResponseType,
      description: 'Mutation for deleting a wishlist',
      args: {
        userId: { type: GraphQLString, description: 'The wishlist owner id' },
        wishlistId: { type: GraphQLString, description: 'The wishlist id' },
      },
      resolve: async (_, { userId, wishlistId }) =>
        deleteWishlist(userId, wishlistId),
    },
  }),
});

const schema = new GraphQLSchema({
  query,
  mutation,
});

export default schema;
