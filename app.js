var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/projecto-dev', { useNewUrlParser: true});

var indexRouter = require('./server/routes/index');
var usersRouter = require('./server/routes/users');
var projectRouter = require('./server/routes/projects');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/projects', projectRouter);
app.get('*', function(req, res) {
  res.sendfile('./client/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // set error response
  res.status(err.status || 500);
  res.send({error: err, message: err.message});
});

module.exports = app;
