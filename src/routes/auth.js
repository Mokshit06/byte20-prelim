const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureAuthenticated, ensureGuest } = require('../../middleware/auth');

router.get(
  '/google',
  ensureGuest,
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  ensureGuest,
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

router.get('/logout', ensureAuthenticated, (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
