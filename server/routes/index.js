var express = require('express');
var router = express.Router();
var User = require('../models/user.model');

router.get('/', function(req, res, next) {
  res.render('../../client/app/index.html');
});

router.post('/signup', function(req, res, next){
  User.createUser(req.body).then(user => res.send({ message: "signed up successfully" })).catch(err => res.send(err));
})

router.post('/login',
  function(req, res, next) {
    User.findOne({ username: req.body.username })
    .then(function (user) {
      if (user == null) { return next({message: 'password not matched'});}
      verified = user.verifyPassword(req.body.password);
      if (!verified) { return next({message: 'password not matched'}); }
      user.setToken();
      res.send({message: user.getToken()});
    }).catch(function(err){
      errs = { message: 'an error occured' + err}
      res.send(errs);
    });
});
module.exports = router;
