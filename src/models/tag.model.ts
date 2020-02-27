import { Schema, Document, model, Types } from 'mongoose';

export interface ITag extends Document {
  productId: Types.ObjectId;
  tag: String;
}

const TagModel = new Schema(
  {
    productId: {
      type: Types.ObjectId,
    },
    tag: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default model<ITag>('Tag', TagModel);
