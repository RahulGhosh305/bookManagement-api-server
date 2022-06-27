require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const morgan = require('./config/morgan');
const helmet = require("helmet");
const expressRateLimit = require("./config/express-rate-limit");
const expressSlowDown = require("./config/express-slow-down");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const xssClean = require("xss-clean");
const cors = require('./config/cors')
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const routes = require('./routes');

const app = express();

require("./config/mongoose"); // connect mongoose

app.use(logger('dev'));
app.use(express.json());
app.use(morgan);
app.use(helmet());
app.use(xssClean());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
app.use(cors) // enable cors

// only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
app.enable("trust proxy");

app.use('/', routes); // routes

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

if (process.env.NODE_ENVIRONMENT === "production") {
  app.use(expressRateLimit); // per window rate limit
  app.use(expressSlowDown);  // slows down responses rather than blocking
}

module.exports = app;
