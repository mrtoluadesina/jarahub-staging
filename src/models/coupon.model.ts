import { Schema, Document, model } from 'mongoose';


export interface IDiscount extends Document {
  name: String;
  discount: string;
  type: String;
  valid: Date;
  isDeleted: Boolean;
}

const DiscountModel = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    discountValue: {
      type: Number,
      required: true
    },
    discountUnit: {
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
      type: Number
    }
  },
  { timestamps: true },
);

export default model<IDiscount>('Discount', DiscountModel);
