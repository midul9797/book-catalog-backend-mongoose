import { z } from 'zod';
const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is Required',
    }),
    mobile: z.string({
      required_error: 'Mobile No is Required',
    }),
  }),
});
const updateWishList = z.object({
  body: z.object({
    id: z.string({
      required_error: 'Id is required',
    }),
    bookId: z.string({
      required_error: 'Book ID is required',
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateWishList,
};
