import { Types, model, Document, Schema } from 'mongoose';

export interface IBoughtWith extends Document {
  productId: Types.ObjectId;
  otherProductIds: [Types.ObjectId];
}

export interface BoughtWith {
  productId: Types.ObjectId;
  otherProductIds: [Types.ObjectId];
}

const IBoughtWithModel = new Schema(
  {
    productId: {
      type: Types.ObjectId,
      required: true,
    },
    otherProductIds: {
      type: Array,
      of: Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true },
);

export default model<IBoughtWith>('BoughtModel', IBoughtWithModel);
