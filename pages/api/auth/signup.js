import nc from 'next-connect';
import * as authController from '../../../backend/controller/auth.controller';
import connectMongo from '../../../backend/connection/mongoConnection';
import nextArgument from '../../../backend/utils/nextConnectArg';
connectMongo();
const handler = nc(nextArgument);
handler.post(authController.signUp);

export default handler;
