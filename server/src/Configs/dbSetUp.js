import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const DBConnect = async () => {
  try {
    const connect = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('DB connected!');
    return connect;
  } catch (error) {
    console.log(error.message);
  }
};

export default DBConnect;
