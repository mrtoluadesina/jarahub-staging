import Transaction, { ITransactionNoExtend } from '../models/transaction.model';
import httpStatus from 'http-status';
import sendResponse from '../helpers/response';
import { IUser } from '../models/user.model';
import Product from '../models/product.model'
import { createOrder } from './order.controller';
import addressModel from '../models/address.model';

// Return All Users
export const getAllTransaction = () => Transaction.find();

// Creating a User
export const init = async (user: IUser, body: ITransactionNoExtend) => {
  try {
    const items = [];

    let chargedAmount = body.isPickUp ? 20000000 : 0; //there should be a model to get the actual value from.
    // put the factor of different pickup location.
    let remarks = [
      {
        time: Date.now(),
        remark: 'initialize transaction',
      },
    ];

    for (let i = 0; i < body.items.length; i++) {
      let item = await Product.findById(body.items[i].productDetailsId)
      if (item){
        //get the total for the items
        //carefully modify this line of code, it is responsible for money conversion to kobo
        let amount = (item.calculatePrice(body.items[i].quantity) * body.items[i].quantity) * 100 
        chargedAmount += amount
        // NOTE: item discount is yet to be gotten
        // take the ids of items
        items.push({productDetailsId: body.items[i].productDetailsId, quantity: body.items[i].quantity, amount });
      }
      
        chargedAmount += (item.calculatePrice(body.items[i].quantity) * body.items[i].quantity)
        // NOTE: discount is yet to be gotten
        // take the ids of items
        items.push({productDetailsId: body.items[i].productDetailsId, quantity: body.items[i].quantity});
      }
    }
    remarks.push({
      time: Date.now(),
      remark: `Compare total amount: input:- ${body.chargedAmount}. computed:- ${chargedAmount}`,
    });
    if (body.chargedAmount > chargedAmount) {
      chargedAmount = body.chargedAmount;
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
    const address = new addressModel({
      userId: user._id,
      ...body.billing
    })
    await address.save()

    const transaction = new Transaction({
      chargedAmount,
      remarks,
      user: user._id,
      items,
      address: address._id
    });

    await transaction.save();
    return sendResponse(
      httpStatus.CREATED,
      'Transaction initialized',
      transaction,
      null,
      '',
    );
  } catch (error) {    
    return sendResponse(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Transaction failed to initialize',
      {},
      {message: error.message},
      ''
    )
  }
};

export const verify = async (body: { transaction: string; reference: string; })=>{
  const remarks = [];
  const transaction = await Transaction.findById(body.transaction)
  try {
    if (transaction){
      await transaction.verify(body.reference)
      if (transaction.status !== 'Success') {
        // send message to user for debit and resolutions sake
        return
      }
      //proceed with order creation of order
      remarks.push({ time: Date.now(), remark: `Initialize Order creation`})
      const orderBody = {
        order: {
          addressId: transaction.address,
          amount: transaction.paidAmount,
          discountId: transaction.discount
        },
        cartItems: transaction.items
      }
      // @ts-ignore
      // DO NOT SAVE TRANSACTION BEFORE HERE!!!
      const order = await createOrder(transaction.user, orderBody)
      remarks.push({ time: Date.now(), remark: `Order Created Successfully`})
      transaction.remarks = [ ...transaction.remarks, ...remarks ]
      await transaction.save()
    }
    return sendResponse(
      httpStatus.CREATED,
      'Orders Created Successfully',
      transaction!!,
      null,
      '',
    );
  } catch (error) {
    if (transaction) await transaction.save()
    return sendResponse(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Transaction failed to initialize',
      {},
      {message: error.message},
      ''
    )
  }
}