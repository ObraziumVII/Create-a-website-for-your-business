require('dotenv').config();
const bcrypt = require('bcrypt');
const Admin = require('../db/models/adminModel');

const adminSignup = async (req, res) => {
  const { name, email, password, secret } = req.body;
  try {
    if (secret === process.env.SECRET) {
      const pwd = await bcrypt.hash(password, 10);
      const admin = await Admin.create({ name, email, password: pwd });
      req.session.admin_id = admin._id;
      res.locals.admin = true;
      res.redirect('/admin/requests');
    }
  } catch (err) {
    res.render(res.render('error'), {
      errorMessage: 'Данные введены неверно',
    });
  }
};

const adminLogin = async (req, res) => {
  const { name, password } = req.body;
  const admin = await Admin.findOne({ name });
  const validPassword = await bcrypt.compare(password, admin.password);
  if (validPassword) {
    req.session.admin_id = admin._id;
    res.locals.admin = true;
    res.redirect('/admin/requests');
  }
  res.ok(false); // if we want to login with fetch, we can check if response.ok
};

module.exports = { adminLogin, adminSignup };
