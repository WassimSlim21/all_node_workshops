var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsrouter = require('./routes/product');
const config = require('./config/database');
const mongoose = require('mongoose');
const sendEmail = require("./config/sendmail");

var app = express();


/* CORS Setup*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  //  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  //  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Methods', '*');
  
  next();
});

require('dotenv').config();


//Mongoose Connect
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DB, { promiseLibrary: require('bluebird') })
.then((data) =>  {console.log('connection succesful');
}).catch((err) => console.error(err)

);

app.use(passport.initialize());




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
require("dotenv").config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.basedir = path.join(__dirname, 'public');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsrouter);

app.post('/email', async(req, res)=>{
try{
  console.log("Sending mail ...");
  await sendEmail(req.body.email, req.body.subject,req.body.content);
  res.status(200).json({ msg: "password reset link sent to your email account" });
}

    catch (error) {
        res.status(500).json({ err: "An error occured" });
        console.log(error);
    }
});



//Middleware function to log request protocol
app.use('/things', function(req, res, next){
  console.log("A request for things received at " + Date.now());
  next();
});


// Route handler that sends the response
app.get('/things', function(req, res){
  next();
});
app.get('/things', function(req, res){
  res.send('Things 2');
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

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.render('error');
});

module.exports = app;
