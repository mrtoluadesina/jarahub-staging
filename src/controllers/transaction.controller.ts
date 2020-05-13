import Transaction, { ITransactionNoExtend } from '../models/transaction.model';
import httpStatus from 'http-status';
import sendResponse from '../helpers/response';
import { IUser } from '../models/user.model';
import Product from '../models/product.model';
import { createOrder } from './order.controller';
import addressModel from '../models/address.model';
import ControllerResponse from '../interfaces/ControllerResponse';
import couponModel from '../models/coupon.model';

// Return All Users
export const getAllTransaction = () => Transaction.find();

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
      remarks.push({ time: Date.now(), remark: `Order Created Successfully` });
      transaction.remarks = [...transaction.remarks, ...remarks];
      await transaction.save();
    }
    return sendResponse(
      httpStatus.CREATED,
      'Orders Created Successfully',
      transaction!!,
      null,
      '',
    );
  } catch (error) {
    if (transaction) await transaction.save();
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
export const getAllTransactions = async () => {
  try {
    const transactions = await Transaction.find();
    // call save method on transaction to populate user and items
    await transactions.forEach(async (transaction: { save: () => any; }) => await transaction.save());
    return sendResponse(
      httpStatus.FOUND,
      'Success',
      transactions,
      null,
      '',
    );
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