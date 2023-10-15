import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import { UserController } from '../users/user.controller';

const router = express.Router();
router
  // .get('/verify-user', AuthController.verifyUser)
  .post(
    '/signup',
    validateRequest(AuthValidation.createUserZodSchema),
    UserController.createUser
  )
  .post(
    '/login',
    validateRequest(AuthValidation.loginZodSchema),
    AuthController.loginUser
  )
  .post(
    '/refresh-token',
    // validateRequest(AuthValidation.refreshTokenZodSchema),
    AuthController.refreshToken
  );

export const AuthRoute = router;
