import * as ErrorController from '../controller/error.controller';
const nextArgument = {
  onError: (err, req, res, next) => {
    let error = { ...err };
    if (err.code === 11000) {
      error = ErrorController.handleDuplicateFieldError(error);
    }
    if (err.name === 'ValidationError') {
      error = ErrorController.handlerValidationError(error);
    }
    if (err.name === 'TokenExpiredError') {
      error = ErrorController.handleTokenExpiredError(error);
    }
    if (err.name === 'JsonWebTokenError') {
      error = ErrorController.handleJwtTokenError(error);
    }
    if (error.isOperational) {
      //last one
      res.status(error.statusCode).json({
        status: 'fail',
        message: error.message || err.message,
      });
    } else {
      res.status(500).json({
        status: 'fail',
        message: 'something went wrong',
        err,
        errMessage: err.message,
      });
    }
  },
};

export default nextArgument;
