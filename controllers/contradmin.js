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
        return res.status(409).json({ error: 'This email is taken, please login instead' });
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
      res.status(200).end();
      // res.redirect('/admin/requests');
    } else {
      return res.status(409).json({ error: 'your admin secret code is wrong' });
    }
  } catch (err) {
    err.statusCode = 500;
    return next(err);
  }
};

const adminLogin = async (req, res, next) => {
  const { name, password } = req.body;
  const admin = await Admin.findOne({ name });
  const validPassword = await bcrypt.compare(password, admin.password);
  if (validPassword) {
    req.session.admin_id = admin._id;
    res.locals.admin = true;
    return res.redirect('/admin/requests');
  }
  res.redirect('/'); // if we want to login with fetch, we can check if response.ok
};

const showReq = async (req, res) => {
  id = req.params.idreq;
  console.log(id);
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
const search = async (req, res) => {
  let { search } = req.body;
  search = search.toLowerCase();
  let flag = false;

  const requests = await Request.find();
  let validArrNames = [];
  let validArrCompany = [];
  let validArrPhones = [];
  let validArrEmail = [];
  let validArrDescr = [];
  let validArrCom = [];
  //поиск по имени
  for (let i =0; i <requests.length; i++) {
    if (requests[i].name.toLowerCase().includes(search)){
      validArrNames.push(requests[i]);
      flag = true;
    }
  }
  // поиск по компании
  for (let i =0; i <requests.length; i++) {
    if (search == requests[i].companyName.toLowerCase()){
      validArrCompany.push(requests[i]);
      flag = true;
    }
  }
  // поиск по номеру телефона
  for (let i =0; i <requests.length; i++) {
    if (search == requests[i].phone.toLowerCase()){
      validArrPhones.push(requests[i]);
      flag = true;
    }
  }
  // поиск по номеру email
  for (let i =0; i <requests.length; i++) {
    if (search == requests[i].email.toLowerCase()){
      validArrEmail.push(requests[i]);
      flag = true;
    }
  }
  // поиск по совпадению в описании
  for (let i =0; i <requests.length; i++) {
    if (requests[i].description.toLowerCase().includes(search)){
      validArrDescr.push(requests[i]);
      flag = true;
    }
  }
  for (let i =0; i <requests.length; i++) {
    if (requests[i].adminComment){
      if (requests[i].adminComment.toLowerCase().includes(search)){
        validArrCom.push(requests[i]);
        flag = true;
      }
    }
  }

  res.render('requests', { admin: 'eeee', flag, validArrNames, validArrCompany, validArrPhones, validArrEmail, validArrDescr, validArrCom });
}

module.exports = {
  adminLogin, adminSignup, showReq, editReq, updReq, search,
};
