import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from '../../../config';
import bcrypt from 'bcrypt';
const userSchema = new Schema<IUser>(
  {
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: { type: String, requried: true },
  },
  {
    timestamps: true,
  }
);
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
userSchema.statics.isUserExist = async function (
  value: string,
  field: string
): Promise<Partial<IUser> | null> {
  return await User.findOne(
    { [field]: value },
    { _id: 1, password: 1, email: 1 }
  );
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};
const User = model<IUser, UserModel>('User', userSchema);
export default User;
