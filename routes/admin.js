const express = require('express');
const Request = require('../db/models/requestModel');
const { adminLogin, adminSignup, showReq, editReq, updReq } = require('../controllers/contradmin');

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
  console.log(request);
  res.render('requests', { admin: 'eeee' });
});

router.get('/requests/:idreq', showReq);

router.get('/requests/:idreq/edit', editReq);

router.post('/requests/:idreq', updReq);

module.exports = router;
