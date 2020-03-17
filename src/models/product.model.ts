import { Schema, Document, model, Types, Model } from 'mongoose';
import { getActualPrice } from '../helpers/products';

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
  brandName?: String;
  reviews?: Array<Types.ObjectId>;
  calculatePrice: Function;
  updateOrderCount: Function;
  categoryNames?: Array<string>;
}

export interface ProductModelI extends Model<IProduct> {
  post(T: string, C: (E: any, R: any) => {}): void;
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
      type: [Schema.Types.ObjectId],
      ref: 'Categories',
    },
    categoryNames: { type: Array, of: String },
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
      required: true,
    },
    brandName: { type: String, required: true },
    reviews: {
      type: Array,
      of: Types.ObjectId,
      ref: 'Review',
    },
    orderCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
// model methods
ProductModel.pre('find', function(next) {
  this.populate('categoryId', 'name', 'Category');
  this.populate('brandId', 'name', 'Brand');
  next();
});

ProductModel.methods = {
  calculatePrice(qty: number) {
    let productPrice = this.price;
    return getActualPrice(qty, productPrice);
  },
  async updateOrderCount(qty: number) {
    this.orderCount += qty;
    await this.save();
  },
};

export default model<IProduct, ProductModelI>('Product', ProductModel);
