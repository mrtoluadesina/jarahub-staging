import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';
import { ICartItem } from './cartItem.model';

interface IRemark {
  time: Date;
  remark: String;
}


export interface ITransactionNoExtend {
  chargedAmount: number;
  items: ICartItem[];
  billing: object;
  isPickUp: boolean

}

export interface ITransaction extends Document {
  status: String;
  chargedAmount: Number;
  paidAmount: Number;
  reference: String;
  remarks: IRemark[];
  user: IUser;
}
const Remarks = {
  time: Date,
  remark: String,
};

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
      // required: true,
      ref: 'User',
    },
    items: [
      { 
        productDetailsId: {
          type: Schema.Types.ObjectId,
          ref: 'CartItem',
          required: true
        },
        quantity : {
          type: Number,
          required: true
        }
      }
    ],
    billing: {
      firstName: String,
      lastName: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      country: String
    }
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
