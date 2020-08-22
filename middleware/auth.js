const ensureGuest = (req, res, next) => {
  if (req.user) {
    return res.redirect('/dashboard');
  }
  next();
};

const ensureAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  }

  res.redirect('/');
};

module.exports = {
  ensureGuest,
  ensureAuthenticated,
};
