import mongoose, { Schema } from 'mongoose';

export interface IAddress extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  address1: String;
  address2?: String;
  postCode: String;
  city: String;
  isDefault?: Boolean;
}

const AddressModel = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    address1: { type: String, required: true },
    address2: { type: String },
    postCode: { type: String },
    city: { type: String },
    phone: { type: String},
    state: { type: String},
    country: { type: String },
    firstName: { type: String},
    lastName: { type: String},
    isDefault: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model<IAddress>('Address', AddressModel);
