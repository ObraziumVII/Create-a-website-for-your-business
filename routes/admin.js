const router = require('express').Router();
const { adminLogin } = require('../controllers/admin');

router.get('/login', (req, res) => {
  res.render('login');
});

// router.post('/login', async (req, res) => {
//   const { login, password, secret } = req.body;
//   const result = await bcrypt.compare(password, hashedPwd);
//   if (!login || !password || !secret) {
//     res.render('login', { loginMessage: 'Пожалуйста, заполните все поля для входа' });
//   } else {
//     const admin = await Admin.findOne({ name: login /* или name? */ });
//     if (!admin) {
//       res.render('login', { loginMessage: 'Неверное имя администратора' });
//     } else if (admin.password !== result) {
//       res.render('login', { loginMessage: 'Неверное пароль' });
//     } else if (secret !== 'сек') {
//       res.render('login', { loginMessage: 'Неверное секретное слово' });
//     } else {
//       req.session.admin = admin.name;
//       res.redirect('/admin/requests');
//     }
//   }
// });

router.post('/login', adminLogin);

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.cookie('COOKIE', '00', { expires: new Date() });
  res.redirect('/');
});

router.get('/requests', (req, res) => {
  res.render('requests');
});

module.exports = router;
