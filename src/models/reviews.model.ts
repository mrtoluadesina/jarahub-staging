import { Schema, Types, model, Document } from 'mongoose';

export interface IReview extends Document {
  productId: Types.ObjectId;
  rating: number;
  comment: string;
  isVerfied: boolean;
}

export interface Review {
  productId: Types.ObjectId;
  rating: number;
  comment: string;
  isVerfied: boolean;
}

const ReviewModel = new Schema(
  {
    productId: { type: Types.ObjectId, required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
    isVerfied: { type: Boolean },
  },
  { timestamps: true },
);

export default model<IReview>('Review', ReviewModel);
