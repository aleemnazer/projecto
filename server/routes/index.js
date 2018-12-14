var express = require('express');
var router = express.Router();
var User = require('../models/user.model');

router.get('/', function(req, res, next) {
  res.render('../../client/app/index.html');
});

router.post('/signup', function(req, res, next){
  username = req.body.username;
  if (username == "undefined" || username == null )
    return next('username is missing');

  password = req.body.password;
  if (password == "undefined" || password == null )
    return next('password is missing');

  User.createUser(req.body).then(user => res.send({ message: "signed up successfully" })).catch(err => res.send(err));
})

router.post('/login',
  function(req, res, next) {
    username = req.body.username;
    if (username == "undefined" || username == null )
      return next('username is missing');

    password = req.body.password;
    if (password == "undefined" || password == null )
      return next('password is missing');

    User.findOne({ username: username })
    .then(function (user) {
      if (user == null) { return next('user name of password is incorrect');}
      verified = user.verifyPassword(password);
      if (!verified) { return next('incorrect password'); }
      user.setToken();
      res.send({message: user.getToken()});
    }).catch(function(err){
      errs = { error: 'an error occured' + err}
      res.send(errs);
    });
});
module.exports = router;
