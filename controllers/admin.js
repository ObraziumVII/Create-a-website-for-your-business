const bcrypt = require('bcrypt');
const Admin = require('../db/models/adminModel');

const adminLogin = async (req, res) => {
  const { name, password } = req.body;
  const admin = await Admin.findOne({ name });
  const validPassword = await bcrypt.compare(password, admin.password);
  if (validPassword) {
    req.session.admin_id = admin._id;
    res.redirect('/admin/requests');
  }
  res.ok(false); // if we want to login with fetch, we can check if response.ok
};

module.exports = { adminLogin };
