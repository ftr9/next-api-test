import AppError from '../utils/AppError';

export const handleDuplicateFieldError = err => {
  if (err.keyPattern.email) {
    return new AppError('email already exists..', 400);
  } else {
    return new AppError('something is duplicated', 400);
  }
};

export const handlerValidationError = err => {
  const message = Object.values(err.errors).map(el => el.message);
  return new AppError(message.join(','), 400);
};

export const handleTokenExpiredError = err => {
  return new AppError('Token expired please login again...', 400);
};

export const handleJwtTokenError = err => {
  return new AppError('Invalid token please login again', 400);
};
