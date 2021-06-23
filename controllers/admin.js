require('dotenv').config();
const bcrypt = require('bcrypt');
const Admin = require('../db/models/adminModel');
const nodemailer = require("nodemailer");
// let transporter = nodemailer.createTransport({
//   auth: {
//     user: testAccount.user, // generated ethereal user
//     pass: testAccount.pass, // generated ethereal password
//   },
// });

const adminSignup = async (req, res) => {
  const { name, email, password, secret } = req.body;
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
    const err = new Error(err);
    err.statusCode = 500;
    return next(err);
    // res.render(res.render('error'), {
    //   errorMessage: 'Данные введены неверно',
    // });
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
