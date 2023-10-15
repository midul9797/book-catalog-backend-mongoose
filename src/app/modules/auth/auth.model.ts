import { Schema, model } from 'mongoose';
import { IUser, UserModel } from '../users/user.interface';
const userSchema = new Schema<IUser>(
  {
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser, UserModel>('User', userSchema);
export default User;
