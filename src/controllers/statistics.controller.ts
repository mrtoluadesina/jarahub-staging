import httpStatus from 'http-status'
import Transaction, { ITransaction } from '../models/transaction.model';
import StatFactory from '../helpers/statsMaker';

import sendResponse from '../helpers/response'
import OrderItem, { IOrderItem } from '../models/orderItem.model';


export const revenue = async (range: string) => {

  // @ts-ignore
  let transactions: ITransaction[] = await Transaction.getByRange(range)
  console.log(transactions)
  // get stat constructor ready
  let statMaker = StatFactory(range)!!
  transactions.forEach((transaction)=>{
    statMaker.addStat(transaction.paidAt||transaction.updatedAt, transaction.paidAmount)
  })
  return sendResponse(
    httpStatus.CREATED,
    'Success',
    statMaker.getStatData(),
    null, 
    ''
  );

}
