import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import taskRoutes from './routes/tasks';

dotenv.config();
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.fccjy.mongodb.net/${process.env.MONGO_DB}`

const app = express();

app.use(express.json());

app.use('/tasks', taskRoutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    const { statusCode } = error,
        { message } = error,
        { data } = error;
    res.status(statusCode).json({
        message: message,
        data: data
    })
});

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Server is running');
        app.listen(3000);
    })
    .catch(err => console.log(err))