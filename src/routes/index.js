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
  res.json({randomCoordinate: randomCoordinate()})
})
// 
function randomCoordinate(){
  let x = Math.random()
  if( x > 0.5){
    return {lat: -(Math.ceil(Math.random() * 90)), long: Math.ceil(Math.random()* 180)}
  }
  if(x > 0.25){
    return {lat: Math.ceil(Math.random() * 90), long: Math.ceil(Math.random()* 180)}
  }
  return {lat: Math.ceil(Math.random() * 90), long: -(Math.ceil(Math.random()* 180))}
}
// console.log(randomCoordinate)
module.exports = router;
