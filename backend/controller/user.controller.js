import userModel from '../models/useModel';
import catchAsync from '../utils/catchAsync';

export const getAllUsers = catchAsync(async (req, res, next) => {
  await NextCors(req, res, {
    // Options
    methods: ['PUT', 'PATCH', 'POST'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  const user = await userModel.find().select('-__v');
  res.status(200).json({
    status: 'success',
    data: user,
  });
});
