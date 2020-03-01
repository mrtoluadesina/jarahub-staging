import { Schema, Document, model, Types, Model } from 'mongoose';

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
}

export interface ProductModelI extends Model<IProduct> {
  paginate(T: number, C: (E: any, R: any) => {}): void;
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
      type: Map,
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

export default model<IProduct, ProductModelI>('Product', ProductModel);
