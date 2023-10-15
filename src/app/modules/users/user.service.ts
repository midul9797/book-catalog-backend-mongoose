import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import User from './user.model';

const createUserInDB = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create');
  }
  return createdUser;
};
const getSingleUserFromDB = async (id: string): Promise<IUser | null> => {
  const user = await User.findOne({ _id: id });
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrived');
  return user;
};
export const UserServices = {
  createUserInDB,
  getSingleUserFromDB,
};
