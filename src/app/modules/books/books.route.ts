import express from 'express';
import { BookController } from './books.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './books.validation';
const router = express.Router();
router
  .post(
    '/create-book',
    validateRequest(BookValidation.createBookZodSchema),
    BookController.createBook
  )
  .get('/:id', BookController.getOneBook)
  .get('/', BookController.getBooks)

  .patch('/:id', BookController.updateBook)
  .patch('/review/:id', BookController.giveBookReview)
  .delete('/:id', BookController.deleteBook);

export const BookRoutes = router;
