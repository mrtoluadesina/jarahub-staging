import { Schema, Document, model } from 'mongoose';


export interface ICouponNoExtend {
  category?: String;
  discountValue: Number;
  discountUnit: String;
  validFrom: Date;
  validUntil: Date;
  minimumOrderValue: Number;
  maximumDiscount: Number;
  user: {};
  id: String;
  createdBy: String;
  description: String;
  code: String;
}
export interface ICoupon extends Document {
  category: String;
  discountValue: Number;
  discountUnit: String;
  validFrom: Date;
  validUntil: Date;
  minimumOrderValue: Number;
  maximumDiscount: Number;
  isDelete: Boolean;
}

const CouponModel = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    discountValue: {
      type: Number,
      required: true
    },
    discountUnit: {
      type: String,
      enum: ['NAIRA', 'PERCENTAGE'],
      required: true
    },
    validFrom: {
      type: Date,
      required: true
    },
    validUntil: {
      type: Date,
      required: true
    },
    minimumOrderValue: {
      type: Number,
      default: 0
    },
    maximumDiscount: {
      // maximum amount that can be discounted. 
      // if value exist, discount result should not exceed value
      type: Number
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true
    },
    description: {
      type: String
    }
  },
  { timestamps: true },
);

export default model<ICoupon>('Coupon', CouponModel);
