import mongoose from 'mongoose';

const connectMongo = async function () {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('database connected successfully');
    })
    .catch(err => {
      console.log(err);
    });
};

export default connectMongo;
