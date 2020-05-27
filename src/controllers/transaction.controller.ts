import Transaction, { ITransactionNoExtend } from '../models/transaction.model';
import httpStatus from 'http-status';
import sendResponse from '../helpers/response';
import { getCollection } from '../helpers/paginator';
import User, { IUser } from '../models/user.model';
import Product from '../models/product.model';
import { createOrder } from './order.controller';
import addressModel from '../models/address.model';
import ControllerResponse from '../interfaces/ControllerResponse';
import couponModel from '../models/coupon.model';
import OrderItem from '../models/orderItem.model';
import generateMessageTemplate from '../helpers/generateMessageTemplateHeader';
import sendMailV2 from '../helpers/sendMailV2';
import Address from '../models/address.model';

// Return All Users
export const getSingleTransaction = async (id: string) => {
  const transaction = await Transaction.findById(id);

  if (!transaction) {
    return sendResponse(
      httpStatus.NOT_FOUND,
      'Transaction not found',
      transaction,
      { message: 'Not found' },
      null,
    );
  }
  await transaction.save();
  return sendResponse(
    httpStatus.FOUND,
    'Transaction found',
    transaction,
    null,
    null,
  );
};

// Creating a User
export const init = async (user: IUser, body: ITransactionNoExtend) => {
  try {
    const code = body.code;
    let actualAmount = body.isPickUp ? 20000000 : 0; //there should be a model to get the actual value from.
    let totalOrderQty = 0;
    let transactionBody = {
      actualAmount,
      user: user._id,
      remarks: [],
      items: [],
    };
    // put the factor of different pickup location.
    transactionBody.remarks = [
      {
        // @ts-ignore
        time: Date.now(),
        // @ts-ignore
        remark: 'initialize transaction',
      },
    ];

    for (let i = 0; i < body.items.length; i++) {
      let item = await Product.findById(body.items[i].productDetailsId);
      if (item) {
        //get the total for the items
        //carefully modify this line of code, it is responsible for money conversion to kobo
        let amount =
          item.calculatePrice(body.items[i].quantity) *
          body.items[i].quantity *
          100;
        transactionBody.actualAmount += amount;
        // NOTE: item discount is yet to be gotten
        // take the ids of items
        transactionBody.items.push({
          // @ts-ignore
          productDetailsId: body.items[i].productDetailsId,
          // @ts-ignore
          quantity: body.items[i].quantity,
          // @ts-ignore
          amount,
        });
        // count total order quantity
        totalOrderQty += body.items[i].quantity;
      }
    }
    transactionBody.remarks.push({
      // @ts-ignore
      time: Date.now(),
      // @ts-ignore
      remark: `Compare total amount: input:- ${body.chargedAmount}. computed:- ${transactionBody.actualAmount}`,
    });
    if (body.chargedAmount > transactionBody.actualAmount) {
      transactionBody.actualAmount = body.chargedAmount;
    }
    /*
      In future, discount code may be included...
      get discount value from database. Example
      const discount = await Discount.get(body.discountCode) //return { percentage: 3, code: discountCode, isOpen: true, maxUse: 1000, expiresAt: }
      // subtract from chargedAmount
      let discountValue = 0
      if (discount) discountValue = discount.getValue(chargedAmount)
      chargedAmount -= discountValue
      */
    let validCoupon = {
      invalid: true,
      message: '',
    };
    let discountValue = 0;
    if (code) {
      const coupon = await couponModel.findOne({ code });
      if (coupon) {
        // check validation and order amount
        validCoupon = coupon.checkValidation(totalOrderQty);
        console.log(validCoupon);
        // make a discount if coupon exist
        if (!validCoupon.invalid) {
          let discountData = coupon.getDiscountvalue(
            transactionBody.actualAmount,
          );
          discountValue = discountData.value;
          if (discountValue) {
            transactionBody.remarks.push({
              // @ts-ignore
              time: Date.now(),
              // @ts-ignore
              remark: `Coupon computed with ${discountData.message}`,
            });
          }
          validCoupon.message = discountData.message;
          // @ts-ignore
          transactionBody.coupon = coupon._id;
        }
      } else {
        validCoupon = {
          invalid: true,
          message: 'Invalid Coupon code',
        };
      }
    }

    // @ts-ignore
    transactionBody.chargedAmount =
      transactionBody.actualAmount - discountValue;
    const address = new addressModel({
      userId: user._id,
      ...body.billing,
    });
    await address.save();
    // @ts-ignore
    transactionBody.address = address._id;

    const transaction = new Transaction({
      ...transactionBody,
    });

    await transaction.save();
    return sendResponse(
      httpStatus.CREATED,
      'Transaction initialized',
      transaction,
      validCoupon.message ? { message: validCoupon.message } : null,
      '',
    );
  } catch (error) {
    return sendResponse(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Transaction failed to initialize',
      {},
      { message: error.message },
      '',
    );
  }
};

export const verify = async (body: {
  transaction: string;
  reference: string;
}): Promise<ControllerResponse> => {
  const remarks = [];
  const transaction = await Transaction.findById(body.transaction);
  try {
    if (transaction) {
      await transaction.verify(body.reference);
      if (transaction.status !== 'Success') {
        // send message to user for debit and resolutions sake
        return sendResponse(
          httpStatus.INTERNAL_SERVER_ERROR,
          'Transaction failed to initialize',
          {},
          { message: 'error.message' },
          '',
        );
      }
      //proceed with order creation of order
      remarks.push({ time: Date.now(), remark: `Initialize Order creation` });
      const orderBody = {
        order: {
          addressId: transaction.address,
          amount: transaction.paidAmount,
          discountId: transaction.discount,
        },
        cartItems: transaction.items,
      };
      // @ts-ignore
      // DO NOT SAVE TRANSACTION BEFORE HERE!!!
      const order = await createOrder(transaction.user, orderBody);

      /**
       * Get all order items and generate mail table structure
       * I am sure there is a better way of optimizing this
       * Come back to fix
       */
      const orderItems = order.payload.orderItems.map(
        async (orderItemId: string) => {
          let orderItem = await OrderItem.findById(orderItemId);
          let productDetail = await Product.findById(
            orderItem!.productDetailsId,
          );
          let mailDetail = {
            name: productDetail!.name,
            image: productDetail!.images[0],
            price: `${orderItem!.amount / 100}`,
            quantity: `${orderItem!.quantity}`,
          };
          return mailDetail;
        },
      );

      const mailDetail = await Promise.all(orderItems);
      const shipmentaddress = (await Address.findById(transaction.address))!
        .address1;
      //Get customer email address
      const { email, firstName, lastName } = (await User.findById(
        order.payload.userId,
      )) as IUser;
      //Generate mail template
      const mailMessage = generateMessageTemplate(
        process.env.SENDER_MAIL,
        email,
        {
          email,
          items: mailDetail,
          total: order.payload.amount / 100,
          receipt: true,
          customername: `${firstName} ${lastName}`,
          orderid: order.payload._id,
          shipmentaddress,
        },
        process.env.ORDER_TEMPLATE_ID,
      );

      try {
        await sendMailV2(mailMessage);
      } catch (error) {
        console.log(error.message);
      }

      remarks.push({ time: Date.now(), remark: `Order Created Successfully` });
      transaction.remarks = [...transaction.remarks, ...remarks];
      await transaction.save();
      return sendResponse(
        httpStatus.CREATED,
        'Orders Created Successfully',
        transaction,
        null,
        '',
      );
    } else {
      throw new Error('Could not find transaction');
    }
  } catch (error) {
    // track error and last state of the transaction
    if (transaction) {
      // get the error remark and save in transaction for tracking purposes
      remarks.push({
        time: Date.now(),
        remark: `Error occured: ${error.message}`,
      });
      transaction.remarks = [...transaction.remarks, ...remarks];
      await transaction.save();
    }
    return sendResponse(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Transaction failed to initialize',
      {},
      { message: error.message },
      '',
    );
  }
};

// get all transactions
export const getAllTransactions = async (query: {}) => {
  try {
    const transactions = await getCollection(Transaction, query);
    // the find pre-hook on transaction populates user and items
    return sendResponse(httpStatus.FOUND, 'Success', transactions, null, '');
  } catch (error) {
    return sendResponse(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Transaction query failed',
      {},
      { message: error.message },
      '',
    );
  }
};
