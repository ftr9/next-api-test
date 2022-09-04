import catchAsync from '../utils/catchAsync';
import { promisify } from 'util';
import userModel from '../models/useModel';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError';

const authorizationMiddleware = catchAsync(async (req, res, next) => {
  //check if authorization headers is present
  if (
    !req.headers.authorization &&
    !req.headers?.authorization?.includes('bearer')
  ) {
    return next(new AppError('user is not authorized...', 401));
  }

  //check the token now
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return next(new AppError('user is not authorized..', 401));
  }

  //decode and check if user exists
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await userModel.findById(decoded.id);
  if (!user) {
    return next(new AppError('user is not authorized'), 400);
  }

  req.user = user;
  next();
});

export default authorizationMiddleware;
