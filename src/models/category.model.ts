import { Schema, Document, model, Types } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  isDeleted: Boolean;
  parents?: Types.ObjectId[];
  icon?: string;
  children?: Types.ObjectId[];
}

export interface Category {
  name: string;
  isDeleted: Boolean;
  parents?: Types.ObjectId[];
  icon?: string;
  children?: Types.ObjectId[];
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
  },
  { timestamps: true },
);

export default model<ICategory>('Category', CategoryModel);
