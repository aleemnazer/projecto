var express = require('express');
var passport = require('../passport');
var router = express.Router();
var User = require('../models/user.model')

router.get('/', passport.authenticate('bearer', { session: false }), function(req, res, next) {
    User.findAll().then(user => res.send(user)).catch(err => res.send(err));
});

router.post('/', passport.authenticate('bearer', { session: false }), function(req, res, next) {
    User.createUser(req.body).then(user => res.send(user)).catch(err => res.send(err));
});

router.get('/:id', passport.authenticate('bearer', { session: false }), function(req, res, next){
  User.findOne({ _id: req.params.id }).
    populate('projects').
    exec(function (err, user) {
        if (err) return next(err);
        return res.send(user);
    });
  // User.userDetails(req.params.id).then(user => res.send(user)).catch(err => res.send(err));
});  
router.delete('/:id', passport.authenticate('bearer', { session: false }), function(req, res, next){
  User.removeUser(req.params.id).then(user => res.send(user)).catch(err => res.send(err));
});
router.put('/:id', passport.authenticate('bearer', { session: false }), function(req, res, next){
  User.updateUser(req.params.id, req.body).then(user => res.send(user)).catch(err => res.send(err));
});

module.exports = router;
