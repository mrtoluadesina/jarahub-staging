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
  getDiscountvalue: Function;
  checkValidation: Function;
}

const CouponModel = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    discountValue: {
      type: Number,
      required: true,
    },
    discountUnit: {
      type: String,
      enum: ['NAIRA', 'PERCENTAGE'],
      required: true,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    minimumOrderValue: {
      type: Number,
      default: 0,
    },
    maximumDiscount: {
      // maximum amount that can be discounted.
      // if value exist, discount result should not exceed value
      type: Number,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

CouponModel.methods = {
  getDiscountvalue(amount: number) {
    let value = 0;
    let message = '';
    if (this.discountUnit == 'PERCENTAGE') {
      value = Math.floor(amount * (this.discountValue / 100));
      message = `${this.discountValue}% OFF`;
    } else if (this.discountUnit == 'NAIRA') {
      value = this.discountValue;
      message = `${this.discountValue / 100} NAIRA OFF`;
    }
    // check for discount limits
    if (this.maximumDiscount && this.maximumDiscount < value) {
      message = `${this.maximumDiscount} NAIRA OFF`;
      value = this.maximumDiscount;
    }
    return { value, message };
  },
  checkValidation(qty: number) {
    // check expiration or if started
    let currentDate = Date.now();
    let message = 'Invalid Coupon';
    let invalid = true;
    if (this.validFrom <= currentDate && currentDate <= this.validUntil) {
      invalid = false;
      message = 'Valid Coupon';
    }
    // check minimumOrderValue
    if (this.minimumOrderValue > qty) {
      invalid = true;
      message = `Items in Cart must be more than ${this.minimumOrderValue}`;
    }
    return { invalid, message };
  },
};

export default model<ICoupon>('Coupon', CouponModel);
