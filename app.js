require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { connect } = require('./db/models/connect');
// const { sessionMiddle, isAdmin } = require('./middleware/middleware');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const sessionConfig = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  name: 'Cookie111',
  cookie: { secure: false },
  store: MongoStore.create({ mongoUrl: process.env.DB }), // ?????
};

app.use(session(sessionConfig));
app.use(morgan('dev'));

// middleware для создания админа во все hbs
app.use((req, res, next) => {
  if (req.session.admin_id) {
    res.locals.admin = true;
    res.locals.adminName = req.session.adminName;
  }
  next();
});

app.use('/', indexRouter);
app.use('/admin', adminRouter);

app.use('*', (req, res, next) => {
  const err = new Error('Page Not Found', 404);
  next(err);
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Something went wrong';
  res.status(statusCode).render('error', { err });
})

app.listen(process.env.PORT, () => {
  console.log('Подключение прошло успешно');
  connect();
});
