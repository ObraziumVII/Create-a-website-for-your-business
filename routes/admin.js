const router = require('express').Router();
const { adminLogin } = require('../controllers/admin');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', adminLogin);

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.cookie('COOKIE', '00', { expires: new Date() });
  res.redirect('/');
});

router.get('/requests', (req, res) => {
  res.render('requests', { admin: 'eeee' });
});

module.exports = router;
