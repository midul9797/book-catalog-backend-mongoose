import express from 'express';

import { AuthRoute } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/books/books.route';
import { UserRoutes } from '../modules/users/user.route';
import { WishListRoutes } from '../modules/wishList/wishList.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/wish-list',
    route: WishListRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
