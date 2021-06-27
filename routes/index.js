const express = require('express');
const Request = require('../db/models/requestModel');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');
const path = require('path');
const router = express.Router();
router.get('/', (req, res) => {
  res.render('index');
});
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'uploads')
//   },
//   filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now())
//   }
// });
// var upload = multer({ storage: storage });
router.post('/apply', upload.single('file'), async (req, res) => {
  // console.log('Hello');
  try {
    console.log('Зашел в ручку');
    const {
      name, companyName, phone, email, description, link,
    } = req.body;
    console.log(req.file);
  //   const img = {
  //     data: await fs.readFile(path.join(__dirname + '/uploads/' + req.file.filename)),
  //     contentType: 'image/png'
  // };
    const newRequest = new Request({
      name, companyName, phone, email, description, link,
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
  
  res.send('База данных пополнена');
});
module.exports = router;
