import { Schema, model, Document } from 'mongoose';

export interface IBrand extends Document {
  name: string;
  logo?: string;
  buyCount?: number;
}

export interface Brand {
  name: string;
  logo?: string;
  buyCount?: number;
}

const BrandModel = new Schema(
  {
    name: { type: String, required: true },
    logo: { type: String },
    buyCount: { type: Number },
  },
  { timestamps: true },
);

export default model<IBrand>('Brand', BrandModel);
