import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IWishList, IWishListPayload } from './wishList.interface';

import WishList from './wishList.model';
import { Types } from 'mongoose';

const getWishListFromDB = async (userId: string): Promise<IWishList | null> => {
  const wishList = await WishList.findOne({ userId }).populate('books');
  if (!wishList)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrived');
  return wishList;
};

const updateWishListInDB = async (
  payload: IWishListPayload
): Promise<IWishList | null> => {
  const result = await WishList.findOne({ userId: payload.userId });
  const bookid = new Types.ObjectId(payload.bookId);
  if (!result) {
    const data = {
      userId: payload.userId,
      books: [bookid],
    };
    const res = await WishList.create(data);
    return res;
  }
  // eslint-disable-next-line no-console
  console.log(result);
  result?.books?.push(bookid);
  const res = await WishList.findOneAndUpdate(
    { userId: payload.userId },
    result,
    { new: true }
  );
  return res;
};

export const WishListServices = {
  getWishListFromDB,
  updateWishListInDB,
};
