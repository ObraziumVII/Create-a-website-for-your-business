require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
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

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
// app.use(cookieParser());

const sessionConfig = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  name: 'Cookie111',
  cookie: { secure: false },
  store: MongoStore.create({ mongoUrl: process.env.DB }),
};

app.use(session(sessionConfig));
// app.use(sessionMiddle);

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// app.use((req, res, next) => {
//   const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
//   next(error);
// });

app.use((err, req, res, next) => {
  const appMode = req.app.get('env');
  // Создаём объект, в котором будет храниться ошибка.
  let error;
  // Если мы находимся в режиме разработки, то отправим в ответе настоящую ошибку.
  //  В противно случае отправим пустой объект.
  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }

  // Записываем информацию об ошибке и сам объект ошибки в специальные переменные,
  //  доступные на сервере глобально, но только в рамках одного HTTP-запроса.
  res.locals.message = err.message;
  res.locals.error = error;

  // Задаём в будущем ответе статус ошибки. Берём его из объекта ошибки, если он там есть.
  // В противно случае записываем универсальный стату ошибки на сервере - 500.
  res.status(err.status || 500);
  // Формируем HTML-текст из шаблона "error.hbs" и отправляем его на клиент в качестве ответа.
  res.render('registration/error');
});

app.listen(process.env.PORT, () => {
  console.log('Подключение прошло успешно');
  connect();
});
