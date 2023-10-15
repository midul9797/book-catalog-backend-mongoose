import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './books.interface';
const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    image: { type: String, requried: true },
    publication_date: { type: String, requried: true },
    publication_year: { type: String },
    reviews: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Book = model<IBook, BookModel>('Book', bookSchema);
export default Book;
