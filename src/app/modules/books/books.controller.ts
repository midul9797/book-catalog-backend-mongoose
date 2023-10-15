import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BookServices } from './books.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IBook } from './books.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/paginationFields';
import { IGenericResponse } from '../../../interfaces/common';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const book = req.body;
  const result = await BookServices.createBookInDB(book);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully!!!',
    data: result,
  });
});
const getBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['query', 'minYear', 'maxYear', 'genre']);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await BookServices.getAllBooksFromDB(
    filters,
    paginationOptions
  );
  sendResponse<IGenericResponse<IBook[]>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrived successfully!!!',
    data: result,
  });
});
const getOneBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookServices.getSingleBookFromDB(id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrived successfully!!!',
    data: result,
  });
});
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await BookServices.updateBookInDB(id, data);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully!!!',
    data: result,
  });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookServices.deleteBookFromDB(id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully!!!',
    data: result,
  });
});
const giveBookReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookServices.giveBookReview(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book review given successfully!!!',
    data: result,
  });
});

export const BookController = {
  createBook,
  getBooks,
  getOneBook,
  updateBook,
  deleteBook,
  giveBookReview,
};
