import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { WishListServices } from './wishList.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const getWishList = catchAsync(async (req: Request, res: Response) => {
  const result = await WishListServices.getWishListFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wish List retrived successfully!!!',
    data: result,
  });
});

const updateWishList = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await WishListServices.updateWishListInDB(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wish List updated successfully!!!',
    data: result,
  });
});

export const WishListController = {
  getWishList,
  updateWishList,
};
