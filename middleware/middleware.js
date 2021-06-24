// const sessionMiddle = (req, res, next) => {
//   res.locals.admin = req.session?.admin_id;
//   next();
// };

const isAdmin = (req, res, next) => {
  if (!req.session.admin_id) {
    return res.redirect('/');
  }
  return next();
};

module.exports = { isAdmin };

