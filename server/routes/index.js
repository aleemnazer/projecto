var express = require('express');
var router = express.Router();
var User = require('../models/user.model');
var passport = require('../passport');

router.get('/', function(req, res, next) {
  res.render('../../client/app/index.html');
});

router.post('/signup', function(req, res, next){
  email = req.body.email;
  if (email == "undefined" || email == null )
    return next({ message: 'email is missing'});

  password = req.body.password;
  if (password == "undefined" || password == null )
    return next({message: 'password is missing'});

  User.createUser(req.body).then(user => res.send({ message: "signed up successfully" })).catch(err => next(err));
});

router.post('/logout', passport.authenticate('bearer', { session: false }), function(req, res, next) {
  User.logout(req.user._id).then(user => res.send('')).catch(err => next(err));
});

router.post('/login',
  function(req, res, next) {
    email = req.body.email;
    if (email == "undefined" || email == null )
      return next('email is missing');

    password = req.body.password;
    if (password == "undefined" || password == null )
      return next('password is missing');

    User.findOne({ email: email })
    .then(function (user) {
      if (user == null) { return next('user name of password is incorrect');}
      verified = user.verifyPassword(password);
      if (!verified) { return next('incorrect password'); }
      user.setToken();
      res.send({message: user.getToken()});
    }).catch(function(err){
      error_message = { error: 'an error occured' + err}
      next(error_message);
    });
});
module.exports = router;
