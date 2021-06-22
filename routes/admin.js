const express = require('express');
const adminSignup = require('../controllers/admin');

const router = express.Router();

router.get('signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', adminSignup);

module.exports = router;

