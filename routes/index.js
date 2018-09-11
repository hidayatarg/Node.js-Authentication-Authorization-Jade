var express = require('express');
var router = express.Router();

var User= require('../models/user');

// GET   /registration 
router.get('/register',function (req, res, next){
  // next middle ware to do after the response
 // return res.send('Registration today!');
   return res.render('register', { title:'Sign Up'});
})

// POST /registration
router.post('/register', function(req,res,next){
   // User should Type in fields
  if (req.body.email && 
    req.body.name && 
    req.body.favoriteBook && 
    req.body.password && 
    req.body.confirmPassword){

      // Confim that user typed same password twice
      if (req.body.password !== req.body.confirmPassword){
        var err= new Error('Password do not match.');
        err.status=400;
        return next(err);
      }
    }else{
      // Incase error *(it is forward to middleware)
      var err= new Error('All Fileds Required.');
      err.status=400;
      return next(err);
    }
   
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
