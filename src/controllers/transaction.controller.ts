import Transaction, { ITransactionNoExtend } from '../models/transaction.model';
import httpStatus from 'http-status';
import sendResponse from '../helpers/response';
import { IUser } from '../models/user.model';
import Product from '../models/product.model'

// Return All Users
export const getAllTransaction = () => Transaction.find();

// Creating a User
export const init = async (user: IUser, body: ITransactionNoExtend) => {
  try {
    const items = [];
    let chargedAmount = body.isPickUp ? 200000 : 0; //there should be a model to get the actual value from.
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
    const transaction = new Transaction({
      chargedAmount,
      remarks,
      user: user._id,
      items,
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
      null,
      ''
    )
  }
};
