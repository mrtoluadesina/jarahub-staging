import Transaction, { ITransactionNoExtend } from '../models/transaction.model';
import httpStatus from 'http-status';
import sendResponse from '../helpers/response';
// import { tokenEncoder as TokenEncoder } from '../helpers/tokenEncoder';
// import sendMail from '../helpers/sendMail';
// import messages from '../helpers/mailMessage';

// Return All Users
export const getAllTransaction = () => Transaction.find();

// Creating a User
export const init = async (body: ITransactionNoExtend) => {
  try {
    const items = [];
    let chargedAmount = 0;
    let remarks = [
      {
        time: Date.now(),
        remark: 'initialize transaction',
      },
    ];
    for (let i = 0; i < body.items.length; i++) {
      // take the ids of items
      items.push(body.items[i]._id);
      //get the total for the items
      // NOTE: discount is yet to be gotten
      chargedAmount += body.items[i].amount * parseInt(body.items[i].quantity);
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
      user: body.user,
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
    throw new Error(error);
  }
};
