import { Schema, Document, model, Types } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  isDeleted: Boolean;
  parents?: Types.ObjectId[];
  icon?: string;
  children?: Types.ObjectId[];
  image?: string;
  slug: string;
}

export interface Category {
  name: string;
  isDeleted: Boolean;
  parents?: Types.ObjectId[];
  icon?: string;
  children?: Types.ObjectId[];
  image?: string;
  slug: string;
}

const CategoryModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    parents: {
      type: Array,
      ref: 'Category',
    },
    icon: {
      type: String,
    },
    children: [{ type: Types.ObjectId, ref: 'Category' }],
    image: { type: String },
    slug: { type: String, required: true },
  },
  { timestamps: true },
);

export default model<ICategory>('Category', CategoryModel);
