import { Schema, model, Document } from 'mongoose';

enum Priority {
  high = 0,
  low = 1,
}

export interface ICollection extends Document {
  productIds: Array<string>;
  name: string;
  image: string;
  priority: number;
}

export interface Collection {
  productIds: Array<string>;
  name: string;
  image: string;
  priority: number;
}

const CollectionSchema = new Schema(
  {
    productIds: { type: Array, of: String, ref: 'Collection', required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    priority: { type: Priority, enum: [0, 1], required: true },
  },
  { timestamps: true },
);

export default model<ICollection>('Collection', CollectionSchema);
