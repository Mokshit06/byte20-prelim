const express = require('express');
const router = express.Router();
const { ensureGuest, ensureAuthenticated } = require('../../middleware/auth');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard');
});

router.get('/login', ensureGuest, (req, res) => {
  res.render('login');
});

module.exports = router;
