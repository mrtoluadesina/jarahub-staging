import { Schema, Document, model, Types } from 'mongoose';
import { getActualPrice } from '../helpers/products'

export interface IProduct extends Document {
  name: string;
  description: String;
  categoryId: Array<Types.ObjectId>;
  sku: String;
  specification: String;
  quantity: Number;
  totalStock: Number;
  price: Map<String, String>;
  images: Array<String>;
  isDeleted?: Boolean;
  isInStock: Boolean;
  discountId: Types.ObjectId;
  tags: Array<string>;
  brandId?: Types.ObjectId;
  reviews?: Array<Types.ObjectId>;
  calculatePrice: Function;
}

export interface IPrice {
  range: String;
}

const ProductModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Array,
      of: Types.ObjectId,
      ref: 'Category',
    },
    sku: {
      type: String,
      required: true,
    },
    specification: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalStock: {
      type: Number,
    },
    price: {
      type: Object,
      of: String,
      required: true,
    },
    images: {
      type: Array,
      of: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isInStock: {
      type: Boolean,
      default: true,
    },
    discountId: {
      type: Types.ObjectId,
    },
    tags: {
      type: Array,
      of: Types.ObjectId,
      ref: 'Tag',
    },
    brandId: {
      type: Types.ObjectId,
      ref: 'Brand',
    },
    reviews: {
      type: Array,
      of: Types.ObjectId,
      ref: 'Review',
    },
  },
  { timestamps: true },
);

ProductModel.methods = {
  calculatePrice(qty: number){
    let productPrice = this.price
    return getActualPrice(qty, productPrice)
  }
}

export default model<IProduct>('Product', ProductModel);
