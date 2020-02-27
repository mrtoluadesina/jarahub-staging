import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInputObjectType,
} from 'graphql';

import { IOrderInterface } from '../interfaces/GraphqlOrder';
import { IOrder } from '../models/order.model';

export const OrderType: GraphQLObjectType<
  IOrderInterface
> = new GraphQLObjectType({
  name: 'OrderType',
  description: 'All available orders',
  fields: () => ({
    userId: {
      type: GraphQLID,
      description: 'The ID of the user that made the order',
      resolve: parent => {
        return parent.payload!.userId;
      },
    },
    addressId: {
      type: GraphQLID,
      description: 'The ID of the address the order would be delivered to',
      resolve: parent => parent.payload!.addressId,
    },
    discountId: {
      type: GraphQLID,
      description: 'The ID of the discount attached to the order',
      resolve: parent => parent.payload!.discountId,
    },
    status: {
      type: GraphQLString,
      description: 'The status of the order',
      resolve: parent => parent.payload!.status,
    },
    amount: {
      type: GraphQLInt,
      description: 'The total price of the order',
      resolve: parent => parent.payload!.amount,
    },
    orderItems: {
      type: new GraphQLList(OrderItemsType),
      description: 'The items made for this order',
      resolve: parent => parent.payload!.orderItems,
    },
  }),
});

export const OrderInputType = new GraphQLInputObjectType({
  name: 'OrderInputType',
  description: 'All available orders',
  fields: () => ({
    userId: {
      type: GraphQLID,
      description: 'The ID of the user that made the order',
    },
    addressId: {
      type: GraphQLID,
      description: 'The ID of the address the order would be delivered to',
    },
    discountId: {
      type: GraphQLID,
      description: 'The ID of the discount attached to the order',
    },
    status: {
      type: GraphQLString,
      description: 'The status of the order',
    },
    amount: {
      type: GraphQLInt,
      description: 'The total price of the order',
    },
  }),
});

export const UserOrderType: GraphQLObjectType<IOrder> = new GraphQLObjectType({
  name: 'UserOrderType',
  description: 'All available orders',
  fields: () => ({
    userId: {
      type: GraphQLID,
      description: 'The ID of the user that made the order',
      resolve: parent => parent.userId,
    },
    addressId: {
      type: GraphQLID,
      description: 'The ID of the address the order would be delivered to',
      resolve: parent => parent.addressId,
    },
    discountId: {
      type: GraphQLID,
      description: 'The ID of the discount attached to the order',
      resolve: parent => parent.discountId,
    },
    status: {
      type: GraphQLString,
      description: 'The status of the order',
      resolve: parent => parent.status,
    },
    amount: {
      type: GraphQLInt,
      description: 'The total price of the order',
      resolve: parent => parent.amount,
    },
    orderItems: {
      type: new GraphQLList(OrderItemsType),
      description: 'The items made for this order',
      resolve: parent => parent.orderItems,
    },
  }),
});

export const OrderItemsType: GraphQLObjectType<
  IOrderInterface
> = new GraphQLObjectType({
  name: 'OrderItemsType',
  description: 'The type for order items',
  fields: () => ({
    orderId: { type: GraphQLID, description: 'The order id for this item' },
    productDetailsId: {
      type: GraphQLID,
      description: 'The product details id',
    },
    quantity: {
      type: GraphQLString,
      description: 'The quantity of product ordered',
    },
    isWholeSale: {
      type: GraphQLBoolean,
      description: 'The type of order made wholesale or unit',
    },
    amount: { type: GraphQLInt, description: 'The price of this order item' },
  }),
});

export const UpdateStatusType = new GraphQLObjectType({
  name: 'UpdateStatusType',
  description: 'Status update input type',
  fields: () => ({
    message: { type: GraphQLString, resolve: parent => parent.message },
  }),
});

export const UpdateStatusInputType = new GraphQLInputObjectType({
  name: 'UpdateStatusInputType',
  description: 'Status update input type',
  fields: () => ({
    orderId: { type: GraphQLID },
    status: { type: GraphQLString, description: 'The new status code' },
  }),
});
