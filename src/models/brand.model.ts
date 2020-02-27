import { Schema, model, Document } from 'mongoose';

export interface IBrand extends Document {
  name: string;
  logo?: string;
}

export interface Brand {
  name: string;
  logo?: string;
}

const BrandModel = new Schema(
  {
    name: { type: String, required: true },
    logo: { type: String },
  },
  { timestamps: true },
);

export default model<IBrand>('Brand', BrandModel);
