import { Model } from 'mongoose';
export type IBook = {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  image: string;
  publication_date: string;
  publication_year?: number;
  reviews?: string[];
};
export type IBookFilterOption = { query?: string };
export type BookModel = Model<IBook>;
