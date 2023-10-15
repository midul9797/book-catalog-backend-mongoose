import { Model, Types } from 'mongoose';
export type IWishList = {
  userId: string;
  books: {
    _id: Types.ObjectId;
  }[];
};
export type IWishListPayload = {
  userId: string;
  bookId: string;
};
export type WishListModel = Model<IWishList>;
