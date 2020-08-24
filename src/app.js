const path = require('path');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { connection } = require('mongoose');

const connectToDB = require('../config/mongoose');
const initializePassport = require('../config/passport');
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const ticketRouter = require('./routes/ticket');
const metroRouter = require('./routes/metro');
const { ensureAuthenticated } = require('../middleware/auth');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');

connectToDB();

initializePassport(passport);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: connection,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;

  next();
});

//todo Add authentication to routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/ticket', ensureAuthenticated, ticketRouter);
app.use('/metro', ensureAuthenticated, metroRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server ready on ${PORT}`));
