import mongoose, { Schema, Document } from 'mongoose';

export interface IForgotPassword extends Document {
  email: string;
  token?: string;
}

export interface IForgot {
  email: string;
  token?: string;
}

const ForgotPasswordModel = new Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
});

export default mongoose.model<IForgotPassword>(
  'ForgotPassword',
  ForgotPasswordModel,
);
