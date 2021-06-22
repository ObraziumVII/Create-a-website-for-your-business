const express = require('express');
const { adminLogin, adminSignup } = require('../controllers/admin');

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

router.get('/requests', (req, res) => {
  res.render('requests');
});

module.exports = router;
