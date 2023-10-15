import { z } from 'zod';
const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    genre: z.string({
      required_error: 'Genre is Required',
    }),
    image: z.string({
      required_error: 'Image URL is Required',
    }),
    publication_date: z.string({
      required_error: 'Publication Date is Required',
    }),
  }),
});
const updateBook = z.object({
  body: z.object({
    _id: z.string().optional(),
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    image: z.string().optional(),
    publication_date: z.string().optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBook,
};
