const dotenv = require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const connect = require('./db/models/connect');
const requestRouter = require('./routes/request');
const { sessionMiddle, isAdmin } = require('./middleware/middleware');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

const sessionConfig = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: MongoStore.create({ mongoUrl: process.env.DB }), // ?????
};

app.use(session(sessionConfig));
// app.use(sessionMiddle);

app.use('/admin', requestRouter);

app.use((req, res, next) => {
  const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
  next(error);
});


app.listen(process.env.PORT, () => {
  console.log('Подключение прошло успешно');
  connect.connect();
})
