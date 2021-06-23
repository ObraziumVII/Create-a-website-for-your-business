require('dotenv').config();
const bcrypt = require('bcrypt');
const Admin = require('../db/models/adminModel');
const Request = require('../db/models/requestModel');

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
const showReq = async (req, res) => {
  id = req.params.idreq;
  const request = await Request.findOne({ _id: id });
  console.log(request);
  res.render('admin/request', { request });
}
const editReq = async (req, res) => {
  id = req.params.idreq;
  const request = await Request.findOne({ _id: id });
  console.log(request._id);
  res.render('admin/editForm', { id: request._id });
}
const updReq = async (req, res) => {
  let request = await Request.findById(req.params.idreq);
  try {
  console.log(req.body);
  request = await Request.findByIdAndUpdate(req.params.idreq, { adminComment: req.body.adminComment, status: req.body.status });
  } catch (error) {
    console.log('не вышло');
  }
  res.render('admin/request', );
}

module.exports = { adminLogin, adminSignup, showReq, editReq, updReq  };
