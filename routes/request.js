const router = require('express').Router();
const Request = require('../db/models/requestModel');

// Ручка для теста, что из базы данных приходят все заявки
router.get('/', async (req, res) => {
  const allReq = await Request.find();
  // console.log(allReq);
  res.send(200);
})

// Ручка для отображения выбранной заявки
router.get('/request/:idreq', async (req, res) => {
  id = req.params.idreq;
  const request = await Request.findOne({ _id: id });
  console.log(request);
  res.render('admin/request', { request });
})

// Ручка для отображения формы редактирования у выбранной заявки
router.get('/request/:idreq/edit', async (req, res) => {
  id = req.params.idreq;
  const request = await Request.findOne({ _id: id });
  console.log(request._id);
  res.render('admin/editForm', { id: request._id });
})

// Ручка возвращает отредактированную заявку
router.post('/request/:idreq', async (req, res) => {
  let request = await Request.findById(req.params.idreq);
  try {
  console.log(req.body);
  request = await Request.findByIdAndUpdate(req.params.idreq, { adminComment: req.body.adminComment, status: req.body.status });
  } catch (error) {
    console.log('не вышло');
  }
  res.render('admin/request', );
})

module.exports = router;
