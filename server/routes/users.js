var express = require('express');
var passport = require('../passport');
var router = express.Router();
var User = require('../models/user.model')

router.get('/', passport.authenticate('bearer', { session: false }), function(req, res, next) {
    if (req.user.role == 'admin')
      users = User.findAll()
    else
      users = User.findAll({_id: req.user.id})
    users.then(user => res.send(user)).catch(err => next(err));
});

router.post('/', passport.authenticate('bearer', { session: false }), function(req, res, next) {
    User.createUser(req.body).then(user => res.send(user)).catch(err => res.send(err));
});

router.get('/:id', passport.authenticate('bearer', { session: false }), function(req, res, next){
  User.userDetails(req.params.id).then(user => res.send(user)).catch(err => res.send(err));
});  
router.delete('/:id', passport.authenticate('bearer', { session: false }), function(req, res, next){
  User.removeUser(req.params.id).then(user => res.send(user)).catch(err => res.send(err));
});
router.put('/:id', passport.authenticate('bearer', { session: false }), function(req, res, next){
  User.updateUser(req.params.id, req.body).then(user => res.send(user)).catch(err => res.send(err));
});

module.exports = router;
