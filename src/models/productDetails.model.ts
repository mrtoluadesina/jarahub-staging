import { Document, Types, Schema, model } from 'mongoose';

export interface IProductDetails extends Document {
  productId: Types.ObjectId;
  size: String;
  color: String;
}

const ProductDetailsModel = new Schema({
  productId: {
    type: Types.ObjectId,
    ref: 'Product',
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
});

export default model<IProductDetails>('ProductDetails', ProductDetailsModel);
