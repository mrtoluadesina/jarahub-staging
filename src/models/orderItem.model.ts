import mongoose, { Schema } from 'mongoose';

export interface IOrderItem extends mongoose.Document {
  orderId: mongoose.Types.ObjectId;
  productDetailsId: mongoose.Types.ObjectId;
  quantity: Number;
  isWholeSale: Boolean;
  amount: number;
}

const OrderItemModel = new Schema(
  {
    orderId: { type: mongoose.Types.ObjectId, ref: 'Order', required: true },
    productDetailsId: {
      type: mongoose.Types.ObjectId,
      ref: 'ProductDetails',
      required: true,
    },
    quantity: { type: String, required: true },
    isWholeSale: { type: Boolean, required: true, default: false },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IOrderItem>('OrderItem', OrderItemModel);
