const sessionMiddle = (req, res, next) => {
  res.locals.admin.id = req.session?.admin._id;
  next();
};

const isAdmin = (req, res, next) => {
  if (req.session.admin._id) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = { sessionMiddle, isAdmin };
