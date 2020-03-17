import mongoose, { Schema, Document } from 'mongoose';
import bcrypt, { hash } from 'bcryptjs';

export interface IUserNoExtend {
  email: string;
  firstName: String;
  lastName: String;
  DOB?: Date;
  phone?: String;
  password: String;
  isDeleted?: Boolean;
  isActive?: Boolean;
  isVerified?: Boolean;
  isGuest?: Boolean;
}

export interface IUser extends Document {
  email: string;
  firstName: String;
  lastName: String;
  DOB?: Date;
  phone?: String;
  password: String;
  isDeleted?: Boolean;
  isActive?: Boolean;
  isVerified?: Boolean;
  isGuest?: Boolean;
  transform: Function;
}

export interface ILogin {
  email: String;
  password: string;
}

const UserModel = new Schema(
  {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    DOB: { type: Date },
    phone: { type: String },
    // @ts-ignore
    password: {
      type: String,
      required: function() {
        return !this.isGuest;
      },
    },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    isGuest: { type: Boolean, default: false },
  },
  { timestamps: true },
);

UserModel.pre<IUser>('save', async function() {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await hash(this.password.toString(), salt);
  }
});
// UserModel.pre<IUser>('findOneAndUpdate', async function() {
//   if (this.isModified('password')) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await hash(this.password.toString(), salt);
//   }
// });
UserModel.methods = {
  transform() {
    const {
      email,
      lastName,
      firstName,
      DOB,
      phone,
      isDeleted,
      isActive,
      isVerified,
      isGuest,
    } = this;

    return {
      email,
      firstName,
      lastName,
      DOB,
      phone,
      isDeleted,
      isActive,
      isVerified,
      isGuest,
    };
  },
};

export default mongoose.model<IUser>('User', UserModel);
