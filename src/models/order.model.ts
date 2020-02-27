import { Schema, Document, Types, model } from 'mongoose';

// enum OrderStatus {
//   'Pending',
//   'In-Progress',
//   'Completed',
//   'Failed',
//   'Cancelled',
// }

export interface IOrder extends Document {
  userId: Types.ObjectId;
  addressId: Types.ObjectId;
  discountId: Types.ObjectId;
  status?: String;
  amount: Number;
  orderItems: String[];
}

const OrderModel = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    addressId: {
      type: Types.ObjectId,
      ref: 'Address',
      required: true,
    },
    discountId: {
      type: Types.ObjectId,
      ref: 'Discount',
    },
    status: {
      type: String,
      enum: ['Pending', 'In-Progress', 'Completed', 'Failed', 'Cancelled'],
      default: 'Pending',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    orderItems: {
      type: [{ type: Types.ObjectId, ref: 'OrderItem' }],
    },
  },
  {
    timestamps: true,
  },
);

export default model<IOrder>('Order', OrderModel);
