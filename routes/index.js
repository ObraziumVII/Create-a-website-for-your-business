const express = require('express');
const Request = require('../db/models/requestModel');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', async (req, res) => {
  const {
    name, companyName, phone, email, description, img, link,
  } = req.body;
  const newRequest = new Request({
    name, companyName, phone, email, description, img, link,
  });

  try {
    await newRequest.save();
  } catch (error) {
    res.render('error', {
      message: 'Не удалось добавить запись в базу данных.',
      error: {},
    });
  }
  res.send('Ваша заявка принята');
});

module.exports = router;
