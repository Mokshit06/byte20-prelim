const express = require('express');
const router = express.Router();
const { ensureGuest, ensureAuthenticated } = require('../../middleware/auth');
const { json } = require('express');
const random = require('random-coordinates');
router.get('/', ensureGuest, (req, res) => {
  res.render('login');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard');
});
router.use(express.json())
router.get('/abcd', function(req,res,next) {
  res.render('id')
})
router.post('/api', function(req,res,next){
  console.log(req.body)
  res.json({arr: random().split(',')})
})

console.log()

function randomCoordinate(){

}
module.exports = router;
