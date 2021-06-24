const express = require('express');
const Request = require('../db/models/requestModel');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/apply', async (req, res) => {
  // console.log('Hello');
  try {
    const {
      name, companyName, phone, email, description, img, link,
    } = req.body;
    const newRequest = new Request({
      name, companyName, phone, email, description, img, link,
    });
    await newRequest.save();
    // res.render('index');
  } catch (error) {
    console.log(error);
    res.render('error', {
      message: 'Не удалось добавить запись в базу данных.',
      error: {},
    });
  }
  // res.send('База данных пополнена');
});

module.exports = router;
