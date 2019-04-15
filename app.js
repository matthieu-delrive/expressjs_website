import indexRouter from "./routes/index.routes";
import cookieParser from "cookie-parser";
import express from "express";
import createError from "http-errors";
import path from "path";
import logger from "morgan";
import loginRouter from "./routes/login.routes";
import usersRouter from "./routes/users.routes";
import newsRouter from "./routes/news.routes";
import signRouter from "./routes/signup.routes";
import session from "express-session";
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import UsersSchema  from './models/users.models';
//Import the mongoose module
import mongoose from "mongoose";


const app = express();
//Set up default mongoose connection
let mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const sess = {
  secret: "lel",
  cookie: {
    expires: 600000
  }};
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use( express.static( "public" ) );
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter);
app.use('/signup', signRouter);

mongoDB = 'mongodb://127.0.0.1/assignment';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
// app.use((req, res, next) => {
//   if (req.cookies.sid && !req.session.user) {
//     res.clearCookie('sid');
//   }
//   next();
// });

passport.use(new LocalStrategy(
  { usernameField: 'email' },
   (email, password, done) => {
    // logger.debug("lel");
    console.log('Inside local strategy callback');
     let user = UsersSchema.findOne({email: email}, function (err, doc) {
      console.log(doc.password);
      console.log(err);
      if (err) return done(null, false, { message: 'Invalid credentials db.\n' });
       if (!doc) {
         return done(null, false, { message: 'Invalid credentials.\n' });
       }
       if (password !== doc.password) {
         return done(null, false, { message: 'Invalid credentials.\n' });
       }
       return done(null, doc);
      //Do your action here..
    });
    // console.log(user);
    // here is where you make a call to the database
    // to find the user based on their username or email address
    // for now, we'll just pretend we found that it was users[0]
    // if (email === user.email && password === user.password) {
    //   console.log('Local strategy returned true');
    //   return done(null, user)
    // }
  }
));
passport.serializeUser((user, done) => {
  console.log('Inside serializeUser callback. User id is save to the session file store here');
  console.log(user);
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  let user = UsersSchema.findOne({_id: id}, function (err, doc) {
    if (err) done(null, false);
    else  done(null, doc);
  });


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

module.exports = app;
