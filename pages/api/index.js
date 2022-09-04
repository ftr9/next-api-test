import nc from 'next-connect';
import nextArgument from '../../backend/utils/nextConnectArg';
import authorizationMiddleware from '../../backend/middlewares/authorization';
const handler = nc(nextArgument);
handler.use(authorizationMiddleware);
handler.get((req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: [
      {
        name: 'sdcdsc',
        age: 'csdcds',
      },
      {
        name: 'sdcdsc',
        age: 'csdcds',
      },
      ,
      {
        name: 'sdcdsc',
        age: 'csdcds',
      },
      ,
      {
        name: 'sdcdsc',
        age: 'csdcds',
      },
      ,
      {
        name: 'sdcdsc',
        age: 'csdcds',
      },
      ,
      {
        name: 'sdcdsc',
        age: 'csdcds',
      },
      ,
      {
        name: 'sdcdsc',
        age: 'csdcds',
      },
    ],
  });
});

export default handler;
