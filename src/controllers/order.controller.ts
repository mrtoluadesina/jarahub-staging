import Order, { IOrder } from '../models/order.model';
import Cart from '../models/cartItem.model';
import OrderItem from '../models/orderItem.model';
import Discount from '../models/discount.model';
import sendResponse from '../helpers/response';
import { getCollection } from '../helpers/paginator';
import Response from '../interfaces/ControllerResponse';
import { OrderBody } from '../interfaces/Orders';
import productModel from '../models/product.model';
import sendMail from '../helpers/sendMail';
import generateMessageTemplateHeaders from '../helpers/generateMessageTemplateHeader';
import sendMailV2 from '../helpers/sendMailV2';

/**
 * @typedef {Object} UserResponse
 * @property {number} status - The server response status code
 * @property {string} message - The server response message
 * @property {Object} payload - The payload returned from the database (optional)
 * @property {string} error - The error message
 * @property {string} token - The token returned for successful request (optional)
 */

/**
 *
 * @returns {UserRessponse} - The response body
 */

export const GetAllOrder = async (query: {}) => {
  const orders = await getCollection(Order, query);
  return sendResponse(200, 'Success', orders, null, '');
};
/**
 * Controller to create and order
 *
 * @param {string} userId - The id of user making the order
 * @param {OrderBody} orderBody - The request body containing the order details and order items
 * @returns {UserResponse} - The response body
 */
export async function createOrder(
  userId: string,
  orderBody: OrderBody,
): Promise<Response> {
  try {
    const newOrder: IOrder = new Order({ ...orderBody.order, userId });
    let totalAmount: number = 0;
    for (
      let i: number = 0, length: number = orderBody.cartItems.length;
      i < length;
      i++
    ) {
      const orderItem = new OrderItem({
        orderId: newOrder._id,
        productDetailsId: orderBody.cartItems[i].productDetailsId,
        quantity: orderBody.cartItems[i].quantity,
        isWholeSale: orderBody.cartItems[i].isWholeSale,
        amount: orderBody.cartItems[i].amount,
      });

      totalAmount += orderBody.cartItems[i].amount;

      newOrder.orderItems.push(orderItem._id);
      let product = await productModel.findById(
        orderBody.cartItems[i].productDetailsId,
      );

      if (!product) {
        return sendResponse(
          401,
          `Product with id ${orderBody.cartItems[i].productDetailsId} not found`,
          {},
          null,
          '',
        );
      }

      await product!!.updateOrderCount(orderBody.cartItems[i].quantity);
      await orderItem.save();
    }
    if (orderBody.order.discountId) {
      const discount = await Discount.findOne({
        _id: orderBody.order.discountId,
      });

      if (discount!.valid < new Date()) {
        return sendResponse(401, 'Coupon code exipred', {}, null, '');
      }

      const percentageDiscount: number = parseInt(discount!.discount);

      newOrder.amount = totalAmount - (percentageDiscount / 100) * totalAmount;
    } else {
      newOrder.amount = totalAmount;
    }
    const payload = await newOrder.save();

    //to send mail to user
    //get user email,
    //@ts-ignore
    let email = payload.userId.email;

    await sendMail(
      email,
      'Your order have been placed. please use this reference id for tracking and resolutions',
      'New Order',
    );

    await Cart.deleteMany({ userId });

    return sendResponse(201, 'Order Created', payload, null, '');
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Controller to change order status
 *
 * @param {string} orderId - The id of the order
 * @param {string} statusType - The status the order would be changed to
 * @returns {UserResponse}
 */

export async function changeOrderStatus(
  orderId: string,
  statusType: string,
): Promise<Response> {
  try {
    const payload = await Order.findOneAndUpdate(
      { _id: orderId },
      { $set: { status: statusType } },
      { new: true },
    );

    //Check if order status was update to completed
    //Get order and send mail to client to rate products bought
    if (!payload) {
      throw new Error('Order not found');
    }

    if (payload.status === 'Completed') {
      const order = await Order.findById(orderId);

      if (!order) {
        throw new Error('Order not found');
      }

      const products = order!.orderItems.map(item => {
        return {
          //@ts-ignore
          ...item.productDetailsId._doc,
          url: `${process.env.CLIENT_SIDE_URL}/reviews/${item.productDetailsId._id}`,
        };
      });

      const msg = generateMessageTemplateHeaders(
        process.env.SENDER_MAIL,
        order.userId.email,
        {
          items: products,
          total: order.amount,
          subtotal: order.amount,
          receipt: true,
          customername: `${order.userId.firstName} ${order.userId.lastName}`,
        },
        process.env.REVIEW_TEMPLATE_ID,
      );

      sendMailV2(msg);
    }

    return sendResponse(200, 'Order Status Changed', payload!, null, '');
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Controller to get a single order
 *
 * @param orderId - The order ID
 * @returns {UserResponse}
 */

export async function getOrder(orderId: string) {
  try {
    const payload = await Order.findOne({ _id: orderId });
    // .populate(
    //   'orderItems',
    // );

    return sendResponse(200, 'Order found', payload!, null, '');
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Controller to get all orders belonging to a user
 *
 * @param userId - The user's ID
 * @returns {UserResponse}
 */

export async function getUserOrder(userId: String) {
  try {
    const payload = await Order.find({ userId }).populate('orderItems');

    return sendResponse(200, 'Success', payload, null, '');
  } catch (error) {
    throw new Error(error.message);
  }
}
