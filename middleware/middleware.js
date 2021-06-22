const sessionMiddle = (req, res, next) => {
  res.locals.admin.id = req.session?.admin.id;
  next();
};

const isAdmin = (req, res, next) => {
  if (req.session.admin.id) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = { sessionMiddle, isAdmin };
