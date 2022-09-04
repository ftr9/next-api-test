import userModel from '../models/useModel';
import catchAsync from '../utils/catchAsync';

export const getAllUsers = catchAsync(async (req, res, next) => {
  const user = await userModel.find().select('-__v');
  res.status(200).json({
    status: 'success',
    data: user,
  });
});
