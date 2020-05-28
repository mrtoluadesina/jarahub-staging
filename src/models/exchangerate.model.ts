import { Schema, model, Document } from 'mongoose';

export interface ExchangeRateType extends Document {
  icon: string;
  sign: string;
  rate: number;
  code: string;
  country: string;
}

const ExchangeRateSchema = new Schema<ExchangeRateType>(
  {
    icon: { type: String, required: true },
    rate: { type: Number, required: true },
    code: { type: String, required: true },
    sign: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true },
);

export default model<ExchangeRateType>('ExchangeRate', ExchangeRateSchema);
