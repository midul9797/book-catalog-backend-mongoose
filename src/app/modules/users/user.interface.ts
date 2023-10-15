import { Model } from 'mongoose';
export type IUser = {
  _id?: string;
  password: string;
  name: string;
  email: string;
  mobile: string;
};
export type UserModel = {
  isUserExist(value: string, field: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
