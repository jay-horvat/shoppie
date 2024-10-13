var createError = require('http-errors');
require('dotenv').config();  
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbRoutes = require('./routes/dbRoutes');
var priceRoute = require('./routes/priceFetcher');
var addProductRoute = require('./routes/addProduct');
var addWallmartProductRoute = require('./routes/addWallmartProduct');

var app = express();

const mysql = require("mysql2/promise");
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;

const db = mysql.createPool({
  connectionLimit: 100,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT
});

// Make db connection pool available to routes via app.locals
app.locals.db = db;

// Enable CORS for all routes globally
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', dbRoutes);
app.use('/', priceRoute);
app.use('/', addProductRoute);
app.use('/', addWallmartProductRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server Started on port ${port}...`));

module.exports = app;
