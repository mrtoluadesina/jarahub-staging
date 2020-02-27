import mongoose, { Schema } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';

export interface IAdmin extends mongoose.Document {
  email: string;
  firstName: String;
  lastName: String;
  DOB: Date;
  phone: String;
  password: string;
  isDeleted: Boolean;
  role: String;
  isSuper?: Boolean;
  isBlocked: Boolean;
  isVerfied: Boolean;
}

const AdminModel = new Schema(
  {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    DOB: { type: Date, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    isSuper: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isVerfied: { type: Boolean, default: false },
  },
  { timestamps: true },
);

AdminModel.pre<IAdmin>('save', async function() {
  if (this.isModified('password')) {
    const salt = await genSalt(10);
    this.password = await hash(this.password.toString(), salt);
  }
});

export default mongoose.model<IAdmin>('Admin', AdminModel);
