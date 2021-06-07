import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import 'shared/container';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';

import routes from 'shared/routes/index';
import AppError from 'shared/errors/AppError';
import 'shared/database/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use((request: Request, response: Response, next: NextFunction) => {
  throw new AppError('API - Doação de Sangue');
});

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
      });
    }

    console.error('err : ', err);

    return response.status(500).json({
      status: 'Error',
      message: `Interna Server Error ${err.message}`,
    });
  },
);

export default app;
