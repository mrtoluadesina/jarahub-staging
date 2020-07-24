import { Schema, Types, model, Document } from 'mongoose';

export interface IReview extends Document {
  productId: Types.ObjectId;
  rating: number;
  comment: string;
  name: string;
  isVerfied: boolean;
}

export interface Review {
  productId: Types.ObjectId;
  rating: number;
  comment: string;
  name: string;
  isVerfied: boolean;
}

const ReviewModel = new Schema(
  {
    productId: { type: Types.ObjectId, required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
    name: { type: String, required: true },
    isVerfied: { type: Boolean },
  },
  { timestamps: true },
);

export default model<IReview>('Review', ReviewModel);
