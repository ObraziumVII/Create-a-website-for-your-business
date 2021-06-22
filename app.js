const express = require('express');
const path = require('path');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieP = require('cookie-parser');
const { connect } = require('./db/models/connect');

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
  cookie: { secure: false },
  store: MongoStore.create({ mongoUrl: process.env.DB }), // ?????
};

app.use(session(sessionConfig));
app.use(sessionMiddle);


app.listen(process.env.PORT, () => {
  console.log('Подключение прошло успешно');
  connect.connect();
})
