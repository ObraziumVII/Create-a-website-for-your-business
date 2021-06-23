require('dotenv').config();
const bcrypt = require('bcrypt');
const Admin = require('../db/models/adminModel');
const Request = require('../db/models/requestModel');
// const nodemailer = require("nodemailer");

// let transporter = nodemailer.createTransport({
//   auth: {
//     user: testAccount.user, // generated ethereal user
//     pass: testAccount.pass, // generated ethereal password
//   },
// });

const adminSignup = async (req, res, next) => {
  const {
    name, email, password, secret,
  } = req.body;
  try {
    if (secret === process.env.SECRET) {
      const foundUser = await Admin.findOne({ email });
      if (foundUser) {
        throw new Error('this email is taken');
      }
      const pwd = await bcrypt.hash(password, 10);
      const admin = await Admin.create({ name, email, password: pwd });
      req.session.admin_id = admin._id;
      res.locals.admin = true;
      // await transporter.sendMail({
      //   to: email,
      //   from: 'project-elbrus-hedgehogs@mail.ru',
      //   subject: 'Singup secceeded',
      //   html: '<h1>You are signed up</h1>'
      // })
      res.redirect('/admin/requests');
    }
  } catch (err) {
    err.statusCode = 500;
    return next(err);
    // res.render(res.render('error'), {
    //   errorMessage: 'Данные введены неверно',
    // });
  }
};

const adminLogin = async (req, res, next) => {
  const { name, password } = req.body;
  console.log('password', password);
  const admin = await Admin.findOne({ name });
console.log(admin);
  const validPassword = await bcrypt.compare(password, admin.password);
  if (validPassword) {
    req.session.admin_id = admin._id;
    res.locals.admin = true;
    console.log('Hello');
    return res.redirect('/admin/requests');
  }
  res.redirect('/admin/login'); // if we want to login with fetch, we can check if response.ok
};

const showReq = async (req, res) => {
  id = req.params.idreq;
  const request = await Request.findOne({ _id: id });
  console.log(request);
  res.render('admin/request', { request });
};
const editReq = async (req, res) => {
  id = req.params.idreq;
  const request = await Request.findOne({ _id: id });
  console.log(request._id);
  res.render('admin/editForm', { id: request._id });
};
const updReq = async (req, res) => {
  let request = await Request.findById(req.params.idreq);
  try {
    console.log(req.body);
    request = await Request.findByIdAndUpdate(req.params.idreq, { adminComment: req.body.adminComment, status: req.body.status });
  } catch (error) {
    console.log('не вышло');
  }
  res.render('admin/request');
};

module.exports = {
  adminLogin, adminSignup, showReq, editReq, updReq,
};
