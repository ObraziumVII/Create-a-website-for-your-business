const sessionMiddle = (req, res, next) => {
  res.locals.admin = req.session.admin_id;
  return next();
};

const isAdmin = (req, res, next) => {
  if (req.session.admin_id) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = { sessionMiddle, isAdmin };
