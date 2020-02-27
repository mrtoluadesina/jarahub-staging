import { Schema, Document, model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  isDeleted: Boolean;
  parents?: string | string[];
  icon?: string;
}

export interface Category {
  name: string;
  isDeleted: Boolean;
  parents?: string | string[];
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
    },
    icon: {
      type: String,
    },
  },
  { timestamps: true },
);

export default model<ICategory>('Category', CategoryModel);
