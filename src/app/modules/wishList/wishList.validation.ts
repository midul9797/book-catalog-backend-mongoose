import { z } from 'zod';

const updateWishList = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'Id is required',
    }),
    bookId: z.string({
      required_error: 'Book ID is required',
    }),
  }),
});

export const WishListValidation = {
  updateWishList,
};
