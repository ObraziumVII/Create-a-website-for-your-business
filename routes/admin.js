const express = require('express');
const Request = require('../db/models/requestModel');
const {
  adminLogin, adminSignup, showReq, editReq, updReq,
} = require('../controllers/contradmin');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', adminLogin);

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.cookie('Cookie111', '00', { expires: new Date() });
  res.redirect('/');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', adminSignup);

router.get('/requests', async (req, res) => {
  const request = await Request.find();
  res.render('requests', { admin: 'eeee', request });
});

router.post('/requests', async (req, res) => {
  const { search } = req.body;
  const request = await Request.find({ status: 'выполнена' });
  res.render('requests', { admin: 'eeee', request });
});

router.get('/requests/inprocess', async (req, res) => {
  const request = await Request.find({ status: 'открыта' });
  res.render('requests', { admin: 'eeee', request });
});

router.get('/requests/inwork', async (req, res) => {
  const request = await Request.find({ status: 'в работе' });
  res.render('requests', { admin: 'eeee', request });
});

router.get('/requests/canceled', async (req, res) => {
  const request = await Request.find({ status: 'отменена' });
  res.render('requests', { admin: 'eeee', request });
});

router.get('/requests/done', async (req, res) => {
  const request = await Request.find({ status: 'выполнена' });
  res.render('requests', { admin: 'eeee', request });
});

router.get('/requests/s/', (req, res) => {
  // const { id } = req.params;
  res.sendStatus(200);
  // res.redirect(`/admin/requests/${id}`);
});

router.get('/requests/:idreq', showReq);

router.get('/requests/:idreq/edit', editReq);

router.post('/requests/:idreq', updReq);

module.exports = router;
