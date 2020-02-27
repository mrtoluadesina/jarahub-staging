import mongoose, { Schema, Document } from 'mongoose';

export interface IResetPassword extends Document {
  userId: mongoose.Types.ObjectId;
}

const ResetPasswordSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IResetPassword>(
  'ResetPassword',
  ResetPasswordSchema,
);
