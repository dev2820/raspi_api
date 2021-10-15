const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const addConnection = require('./middlewares/databaseMiddleware');

const timeRouter = require('./routes/time');
const summaryRouter = require('./routes/summary');
const cpuRouter = require('./routes/cpu');
const memoryRouter = require('./routes/memory');
const ioRouter = require('./routes/io');
const networkRouter = require('./routes/network');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/time',timeRouter);
app.use('/summary',addConnection,summaryRouter);
app.use('/cpu',addConnection,cpuRouter);
app.use('/memory',addConnection,memoryRouter);
app.use('/io',addConnection,ioRouter);
app.use('/network',addConnection,networkRouter);


// catch 404 and forward to error handler
// 알 수 없는 쿼리는 404처리
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.json({
    'message': err.message
  });
});

module.exports = app;
