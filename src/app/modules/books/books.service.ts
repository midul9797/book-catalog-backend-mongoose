import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBook, IBookFilterOption } from './books.interface';
import { bookSearchableFields } from './books.constants';
import Book from './books.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';

const createBookInDB = async (book: IBook): Promise<IBook | null> => {
  book.publication_year = parseInt(book.publication_date.slice(0, 4));
  const createdBook = await Book.create(book);
  if (!createdBook) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create');
  }
  return createdBook;
};
const getAllBooksFromDB = async (
  filters: IBookFilterOption,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { query, ...filteringData } = filters;
  const andCondtion = [];
  if (query) {
    andCondtion.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: query,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filteringData).length) {
    andCondtion.push({
      $and: Object.entries(filteringData).map(([field, value]) => {
        if (field === 'minYear')
          return { ['publication_year']: { $gte: parseInt(value as string) } };
        else if (field === 'maxYear')
          return { ['publication_year']: { $lte: parseInt(value as string) } };
        else
          return {
            [field]: value,
          };
      }),
    });
  }
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder;
  const whereCondition = andCondtion.length > 0 ? { $and: andCondtion } : {};
  const total = await Book.count();

  const result = await Book.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit === 0 ? total : limit);
  //   if(limit===0){

  //    result = await Book.find(whereCondition)
  //   .sort(sortConditions)
  //   .skip(skip)
  //   .limit(total);
  // }else {
  //   result = await Book.find(whereCondition)
  //  .sort(sortConditions)
  //  .skip(skip)
  //  .limit(total);

  // }
  return {
    meta: {
      page,
      limit: limit === 0 ? total : limit,
      total,
    },
    data: result,
  };
};
const getSingleBookFromDB = async (id: string): Promise<IBook | null> => {
  const book = await Book.findOne({ _id: id });
  if (!book) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrived');
  return book;
};
const updateBookInDB = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrived');
  return result;
};
const deleteBookFromDB = async (id: string): Promise<IBook | null> => {
  const result = await Book.findOneAndDelete({ _id: id });
  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete');
  return result;
};
const giveBookReview = async (
  id: string,
  payload: any
): Promise<string | null> => {
  const res = await Book.findOne({ _id: id });
  const reviews = res?.reviews;
  reviews?.push(payload.message);
  const result = await Book.updateOne({ _id: id }, { reviews }, { new: true });
  if (!result)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to give reivew');
  return 'Review Given';
};
const getBookReviews = async (id: string): Promise<IBook | null> => {
  const res = await Book.findOne({ _id: id });

  if (!res) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to give reivew');
  return res;
};
export const BookServices = {
  createBookInDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
  updateBookInDB,
  deleteBookFromDB,
  giveBookReview,
  getBookReviews,
};
