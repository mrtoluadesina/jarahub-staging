import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';
import { ICartItem } from './cartItem.model';
import { verify } from '../helpers/paystack';

interface IRemark {
  time: Number;
  remark: String;
}

export interface ITransactionNoExtend {
  chargedAmount: number;
  items: ICartItem[];
  billing: object;
  isPickUp: boolean;
  code: string;
  getByRange: Function;
}

export interface ITransaction extends Document {
  status: String;
  chargedAmount: number;
  actualAmount: number;
  paidAmount: number;
  reference: string;
  remarks: IRemark[];
  user: IUser;
  paidAt: Date;
  items: ICartItem[];
  discount: string;
  address: string;
  verify: Function;
  getByRange: Function;
  updatedAt: Date;
}
const Remarks = {
  time: Date,
  remark: String,
};

const TransactionModel = new Schema(
  {
    status: {
      type: String,
      enum: ['Success', 'Failed', 'Abandoned'],
      required: true,
      default: 'Abandoned',
    },
    actualAmount: {
      type: Number,
      min: 0,
    },
    chargedAmount: {
      type: Number,
      min: 0,
      required: true,
    },
    paidAmount: {
      type: Number,
      min: 0,
      default: 0,
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
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
    },
    discount: {
      type: Schema.Types.ObjectId,
      ref: 'Discount',
    },
    coupon: {
      type: Schema.Types.ObjectId,
      ref: 'Coupon',
    },
    paidAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

// populate on collection
TransactionModel.pre('find', function(next) {
  this.populate({ path: 'user', select: '-password' });
  this.populate({ path: 'items.productDetailsId' });
  next();
});

// populate on model
TransactionModel.post('save', function(doc, next) {
  doc
    .populate({ path: 'user', select: '-password' })
    .populate({ path: 'items.productDetailsId' }) //, populate: { path: 'productDetailsId'}})
    .execPopulate()
    .then(function() {
      next();
    });
});

// Model Methods, statics
TransactionModel.statics = {
  async getByRange(range: String = 'week') {
    /*
    if range is year, get year beginning eqivalent
    if range is month, get month beginning
    if range is week, get week beginning eqivalent
    */
    let date = new Date();
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth();
    let day = date.getUTCDate();
    let week = date.getUTCDay();

    let dateStart;
    switch (range.toLocaleLowerCase()) {
      case 'year':
        dateStart = new Date(`${year}-${1}`);
        break;
      case 'month':
        dateStart = new Date(`${year}-${month + 1}`);
        break;
      default:
        dateStart = new Date(`${year}-${month + 1}-${day - week}`);
        break;
    }
    let transaction = await this.find({
      status: 'Success',
      createdAt: {
        $gt: dateStart,
      },
    });
    return transaction;
  },
};

// Document methods
TransactionModel.methods = {
  async verify(ref: string) {
    let data = await verify(ref);
    const remark = [];
    if (data) {
      remark.push({ time: Date.now(), remark: `Reference confirmed: ${ref}` });
      const {
        data: { status, amount, paidAt },
      } = data;
      if (status == 'success') {
        this.paidAt = Date.now();
        switch (true) {
          case this.chargedAmount < amount:
            remark.push({
              time: Date.now(),
              remark: `Undercharged: Paid ${amount} but expected ${this.chargedAmount}`,
            });
            this.paidAmount = amount;
            this.status = 'Success';

            break;
          case this.chargedAmount > amount:
            remark.push({
              time: Date.now(),
              remark: `OverCharged: Paid ${amount} but expected ${this.chargedAmount}`,
            });
            this.paidAmount = amount;
            this.status = 'Failed';
            break;

          default:
            remark.push({ time: Date.now(), remark: `Exact: Paid ${amount}` });
            this.paidAmount = amount;
            this.status = 'Success';
            break;
        }
      } else {
        remark.push({
          time: Date.now(),
          remark: `Failed: Paid ${paidAt ? amount : 0} but expected ${
            this.chargedAmount
          }`,
        });
        this.paidAmount = paidAt ? amount : 0;
        this.status = 'Failed';
      }
    } else {
      remark.push({ time: Date.now(), remark: `Failed: Invalid reference` });
    }

    this.remarks = [...this.remarks, ...remark];
  },
};

export default mongoose.model<ITransaction>('Transaction', TransactionModel);
