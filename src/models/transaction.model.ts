import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';
import { ICartItem } from './cartItem.model';

interface IRemark {
  time: Date;
  remark: String;
}

export interface ITransactionNoExtend {
  chargedAmount: number;
  user: String;
  items: ICartItem[];
}

export interface ITransaction extends Document {
  status: String;
  chargedAmount: Number;
  paidAmount: Number;
  reference: String;
  remarks: IRemark[];
  user: IUser;
}
const Remarks = new Schema({
  time: Date,
  remark: String,
});

const TransactionModel = new Schema(
  {
    status: {
      type: String,
      enum: ['Success', 'Fail', 'Abandoned'],
      required: true,
      default: 'Abandoned',
    },
    chargedAmount: {
      type: Number,
      min: 0,
      required: true,
    },
    paidAmount: {
      type: Number,
      min: 0,
    },
    reference: {
      type: String,
    },
    remarks: {
      type: [Remarks],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'CartItem',
      },
    ],
  },
  { timestamps: true },
);

TransactionModel.post('save', function(doc, next) {
  doc
    .populate({ path: 'user', select: '-password' })
    .execPopulate()
    .then(function() {
      next();
    });
});

export default mongoose.model<ITransaction>('Transaction', TransactionModel);
