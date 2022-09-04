import nc from 'next-connect';
import * as userController from '../../../backend/controller/user.controller';
import connectMongo from '../../../backend/connection/mongoConnection';
connectMongo();
const handler = nc({
  onError: (err, req, res, next) => {
    res.status(500).json({
      status: 'fail',
      message: 'something went wrong',
    });
  },
});

handler.get(userController.getAllUsers);

export default handler;
