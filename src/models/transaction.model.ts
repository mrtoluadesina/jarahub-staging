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
  isPickUp: boolean

}

export interface ITransaction extends Document {
  status: String;
  chargedAmount: Number;
  paidAmount: Number;
  reference: String;
  remarks: IRemark[];
  user: IUser;
  items: ICartItem[];
  discount: String;
  address: String;
  verify: Function
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
    chargedAmount: {
      type: Number,
      min: 0,
      required: true,
    },
    paidAmount: {
      type: Number,
      min: 0,
      default: 0
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
          required: true
        },
        quantity : {
          type: Number,
          required: true
        },
        amount : {
          type: Number,
          required: true
        }
      }
    ],
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Address'
    },
    discount: {
      type: Schema.Types.ObjectId,
      ref: 'Discount'
    },
    paidAt: {
      type: Date,
      default: null
        }
      }
    ],
    }
  },
  { timestamps: true },
);

TransactionModel.post('save', function(doc, next) {
  doc
    .populate({ path: 'user', select: '-password' })
    .populate({ path: 'items.productDetailsId'})//, populate: { path: 'productDetailsId'}})
    .execPopulate()
    .then(function() {
      next();
    });
});

TransactionModel.methods = {
  async verify (ref: string) {
    let data = await verify(ref)
    const remark = [];
    if (data){
      remark.push({time: Date.now(), remark: `Reference confirmed: ${ref}`});
      const { data: {status, amount, paidAt} } = data;
      if (status == 'success') {
        switch (true) {
          case this.chargedAmount < amount:
            remark.push({ time: Date.now(), remark: `Undercharged: Paid ${amount} but expected ${this.chargedAmount}`})
            this.paidAmount = amount;
            this.status = 'Success';
            
            break;
          case this.chargedAmount > amount:
            remark.push({ time: Date.now(), remark: `OverCharged: Paid ${amount} but expected ${this.chargedAmount}`})
            this.paidAmount = amount;
            this.status = 'Failed';
            break;
            
          default:
            remark.push({ time: Date.now(), remark: `Exact: Paid ${amount}`})
            this.paidAmount = amount
            this.status = 'Success';
            break;
        }

      } else {
          remark.push({ time: Date.now(), remark: `Failed: Paid ${paidAt? amount: 0} but expected ${this.chargedAmount}`})
          this.paidAmount = paidAt? amount: 0;
          this.status = 'Failed';
      }
    } else {
        remark.push({ time: Date.now(), remark: `Failed: Invalid reference`})
    }

    this.remarks = [...this.remarks, ...remark]
  }
}


export default mongoose.model<ITransaction>('Transaction', TransactionModel);
