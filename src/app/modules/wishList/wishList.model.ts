import { Schema, model } from 'mongoose';
import { IWishList, WishListModel } from './wishList.interface';

const wishListSchema = new Schema<IWishList>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  },
  {
    timestamps: true,
  }
);

const WishList = model<IWishList, WishListModel>('WishList', wishListSchema);
export default WishList;
