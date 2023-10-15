/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import config from '../../../config';
import { AuthServices } from './auth.service';
import httpStatus from 'http-status';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthServices.loginUser(loginData);
  const { refreshToken, accessToken } = result;

  const cookieOptions = {
    // secure: config.env === 'production',
    secure: true,
    httpOnly: true,
    sameSite: 'none' as const,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  res.cookie('accessToken', accessToken, cookieOptions);
  sendResponse<string>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in succesfully',
    data: accessToken,
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User loggedin successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
};
