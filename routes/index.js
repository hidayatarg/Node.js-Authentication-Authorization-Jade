var express = require('express');
var router = express.Router();

// GET   /registration 
router.get('/register',function (req, res, next){
  // next middle ware to do after the response
 // return res.send('Registration today!');
   return res.render('register', { title:'Sign Up'});
})

// POST /registration
router.post('/register', function(req,res,next){
   return res.send('User created');
   
});

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

module.exports = router;
