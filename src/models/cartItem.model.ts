import { Document, Schema, Types, model } from 'mongoose';

export interface ICartItem extends Document {
  userId: Types.ObjectId;
  productDetailsId: Types.ObjectId;
  savedForLater: Boolean;
  quantity: string;
  amount: number;
}

const CartItemModel = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productDetailsId: {
      type: Types.ObjectId,
      ref: 'ProductDetails',
    },
    savedForLater: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default model<ICartItem>('CartItem', CartItemModel);
