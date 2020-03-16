import { Types, Schema, model, Document } from 'mongoose';

export interface IWishlist extends Document {
  userId: String;
  productId: String;
}

export interface Wishlist {
  userId: String;
  productId: String;
  id: string;
}

const WishlistModel = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    productId: { type: Types.ObjectId, ref: 'Product', required: true },
  },
  { timestamps: true },
);

export default model<IWishlist>('Wishlist', WishlistModel);
