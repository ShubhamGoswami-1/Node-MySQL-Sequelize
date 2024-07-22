import express from "express";
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';

import specs from './utils/swaggerConfig.js';
import AppError from './utils/appError.js';

import userRouter from './routes/userRoutes.js';
import logRouter from './routes/logRoutes.js';

import globalErrorHandler from "./controllers/errorController.js";

const app = express();

// app.use (bodyParser.json());
app.use(express.json());

// app.use (bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

// Serve Swagger UI at /api-docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// ROUTES
app.use('/api/v1/logs', logRouter); 
app.use('/api/v1', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;