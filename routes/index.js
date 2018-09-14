var express = require('express');
var router = express.Router();

var User= require('../models/user');
var mid= require('../middleware');

// const checkAuth = (req, res, next) => {
// User.findOne({email: req.body.email}).then(user => {
//   next()
// })
// }
// GET /login
router.get('/login', mid.loggedOut, (req, res, next) => {
    return res.render('login',{title:'Log In'});
});

//POST /login
router.post('/login',function (req, res, next) {
  // return res.send('Logged In!');
  // Check the fields

  if(req.body.email && req.body.password){
    // User authentication
  
    User.authenticate(req.body.email, req.body.password, function (error, user) {
        // Check false authentication
        if(error || !user){
          var err= new Error('Wrong email or password.');
          err.status=401;
          return next (err);
        }
        else{
          req.session.userId=user._id;
          return res.redirect('/profile');
        }

    });
  }
  else{
    // if empty
    var err= new Error('Email and Password are required.');
    err.status=401;
    return next(err);
  }
 
});

// GET /logOut
router.get('/logout',function(req, res, next){
    if(req.session){
      // delete the session
      req.session.destroy(function(err){
        if(err){
          return next(err);
        }else{
          return res.redirect('/');
        }
      })
    }
});


// GET /profile
router.get('/profile',mid.requiresLogin,function(req, res, next){
  // User not signed In (Replaced with middleware)
  // if(! req.session.userId){
  //   var err = new Error('You are not authorized to view this page.');
  //   err.status=401;
  //   return next (err);
  // }

  User.findById(req.session.userId)
    .exec(function(error, user){
      if(error){
        return next(error);
      }
      else{
        return res.render('profile',{title:'Profile', name: user.name, favorite: user.favoriteBook});
      }   
  });
});


// GET   /registration 
router.get('/register',mid.loggedOut, function (req, res, next){
  // next middle ware to do after the response
 // return res.send('Registration today!');
   return res.render('register', { title:'Sign Up'});
});

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

      // Create object with form input
      var userData={
        email: req.body.email,
        name: req.body.name,
        favoriteBook: req.body.favoriteBook,
        password:req.body.password
      };

      // Insert it into mango
      // Use schema 's `create` method to insert document into Mongo
     User.create(userData, function(error,user){
       if(error){
         return next(error);
       }
       else{
        // once register automatically entered
         req.session.userId=user._id;
         return res.redirect('/profile');
       }
     });


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
router.get('/about', mid.requiresLogin, function (req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

module.exports = router;
