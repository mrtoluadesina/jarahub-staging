import { Types, Schema, model, Document } from 'mongoose';

export interface ISingleProductDetails {
  productId: string;
  quantity: number;
  cost: number;
}

export interface IUserDetails {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
}

export interface IReservation extends Document {
  transactionId: any;
  productIds: Array<ISingleProductDetails>;
  userDetails: IUserDetails;
  adminId: Types.ObjectId;
  userId: Types.ObjectId;
  isPickup: boolean;
  chargedAmount: number;
}

const ReservationSchema = new Schema(
  {
    productIds: {
      type: Array,
      of: Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    userDetails: {
      type: Object,
      required: true,
    },
    adminId: {
      type: Types.ObjectId,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
    },
    transactionId: {
      type: Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true },
);

export default model<IReservation>('Reservation', ReservationSchema);
