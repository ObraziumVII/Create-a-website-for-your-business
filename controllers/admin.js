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
      res.redirect('/admin/requests');
    }
  } catch (err) {
    res.render(res.render('error'), {
      errorMessage: 'Данные введене неверно',
    });
  }
};

module.exports = { adminSignup };
