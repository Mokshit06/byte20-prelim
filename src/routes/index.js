const express = require('express');
const router = express.Router();
const { ensureGuest, ensureAuthenticated } = require('../../middleware/auth');

router.get('/', ensureGuest, (req, res) => {
  res.render('login');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard');
});

module.exports = router;
