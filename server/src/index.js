import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import DBConnect from './Configs/dbSetUp.js';
import userRouter from './Routes/UserRoute.js';
import sendErrorResponse from './Middleware/errorHandler.js';
import sendResponse from './Middleware/responseHandler.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

DBConnect();

app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRouter);

// RESPONSE HANDLER MIDDLEWARE (Last middleware to use)
app.use(sendResponse);
// ERROR HANDLER MIDDLEWARE (Last middleware to use)
app.use(sendErrorResponse);

app.listen(PORT, () => {
  console.log('Server is listening to PORT - ' + PORT);
});
