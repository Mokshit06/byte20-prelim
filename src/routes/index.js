const express = require('express');
const router = express.Router();
const { ensureGuest, ensureAuthenticated } = require('../../middleware/auth');
<<<<<<< HEAD
const { json } = require('express');
const random = require('random-coordinates');
router.get('/', ensureGuest, (req, res) => {
  res.render('login');
=======

router.get('/', ensureAuthenticated, (req, res) => {
  res.send('Home Page');
>>>>>>> cbd6c077983d4dfadcea9645e8354b25fc45cbca
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard');
});
<<<<<<< HEAD
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
=======

router.get('/login', ensureGuest, (req, res) => {
  res.render('login');
});

>>>>>>> cbd6c077983d4dfadcea9645e8354b25fc45cbca
module.exports = router;
