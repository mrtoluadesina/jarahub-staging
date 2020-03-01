import { Schema, Document, model, Types } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  isDeleted: Boolean;
  parents?: Types.ObjectId | Types.ObjectId[];
  icon?: string;
}

export interface Category {
  name: string;
  isDeleted: Boolean;
  parents?: string | string[];
  icon?: string;
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
      type: Schema.Types.Mixed,
      ref: 'Categories',
    },
    icon: {
      type: String,
    },
  },
  { timestamps: true },
);

export default model<ICategory>('Category', CategoryModel);
