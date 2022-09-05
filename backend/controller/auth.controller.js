import userModel from '../models/useModel';
import catchAsync from '../utils/catchAsync';
import filterAllowedFields from '../utils/filterFields';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError';
import NextCors from 'nextjs-cors';

const createToken = id => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

export const signUp = catchAsync(async (req, res, next) => {

  await NextCors(req, res, {
      // Options
      methods: ['PUT', 'PATCH', 'POST'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
   })

  const formBody = filterAllowedFields(req.body, [
    'name',
    'email',
    'password',
    'passwordConfirm',
  ]);
  const user = await userModel.create(formBody);
  const token = createToken(user._id);
  res.status(201).json({
    status: 'success',
    token,
  });
});

export const signIn = catchAsync(async (req, res, next) => {

   await NextCors(req, res, {
      // Options
      methods: ['PUT', 'PATCH', 'POST'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
   })

  const { email, password } = req.body;
  if (!email || !password) {
    next(new AppError('please provide email and password', 404));
    return;
  }
  const user = await userModel.findOne({ email }).select('+password');
  if (!user || !(await user.checkPassword(password, user.password))) {
    next(new AppError('incorrect email or password', 400));
  }
  const token = createToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});
