import express from 'express';
import { WishListController } from './wishList.controller';
import validateRequest from '../../middlewares/validateRequest';
import { WishListValidation } from './wishList.validation';
const router = express.Router();
router
  .post(
    '/',
    validateRequest(WishListValidation.updateWishList),
    WishListController.updateWishList
  )
  .get('/:id', WishListController.getWishList);

export const WishListRoutes = router;
