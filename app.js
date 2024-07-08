const express = require("express");
const morgan = require("morgan");

const app = express();

// app.use (bodyParser.json());
app.use(express.json());

// app.use (bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

const AppError = require('./utils/AppError');

const userRouter = require('./routes/userRoutes');
const logRouter = require('./routes/logRoutes');

const globalErrorHandler = require("./controllers/errorController");

// ROUTES
app.use('/api/v1/logs', logRouter); 
app.use('/api/v1', userRouter);



app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;