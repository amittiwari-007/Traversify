// npm import 
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// project import
const tourRouter = require(`./routes/tourRoute.js`);
const userRouter = require(`./routes/userRoute.js`);
const reviewRouter = require(`./routes/reviewRoute.js`); 
const AppError = require('./utils/appError.js');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

const corOptions = {
    origin:'www.natours.com',
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
})
app.use('/api',limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());


app.use(express.json());
app.use((req, res, next) => {
    console.log("Hi from middleware");
    next();
})

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})

app.use(globalErrorHandler)

module.exports = app;
