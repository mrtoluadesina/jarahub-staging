import { Schema, Document, model } from 'mongoose';

enum DiscountType {
  'Product',
  'Coupon',
}

export interface IDiscount extends Document {
  name: String;
  discount: string;
  type: String;
  valid: Date;
  isDeleted: Boolean;
}

const DiscountModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
    },
    type: {
      type: DiscountType,
      enum: ['Product', 'Coupon'],
      required: true,
    },
    valid: {
      type: Date,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default model<IDiscount>('Discount', DiscountModel);
