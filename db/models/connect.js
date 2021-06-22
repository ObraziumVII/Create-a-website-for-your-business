const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const dbUrl = process.env.DB;
const options = {
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

function connect() {
  mongoose.connect(dbUrl, options)
    .then(() => console.log('MONGODB CONNECTED...'))
    .catch((err) => console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', err));
}

function disconnect() {
  mongoose.disconnect()
    .then(() => console.log('Disconected'))
    .catch((err) => console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', err));
}

module.exports = { connect, disconnect };
