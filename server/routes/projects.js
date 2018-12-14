var express = require('express');
var passport = require('../passport');
var router = express.Router();
var Project = require('../models/project.model')

router.get('/', passport.authenticate('bearer', { session: false }), function(req, res, next) {
    Project.findAll(req.user).then(projects => res.send(projects)).catch(err => res.send(err));
});

router.post('/', passport.authenticate('bearer', { session: false }), function(req, res, next) {
  title = req.body.title
  if (title == "undefined" || title == null )
    return next('Title is missing');
  Project.createProject(req.body, req.user._id).then(project => res.send(project)).catch(err => res.send(err));
});

router.get('/:id', passport.authenticate('bearer', { session: false }), function(req, res, next){
  Project.projectDetails(req.params.id, req.body).then(project => res.send(project)).catch(err => res.send(err));
});  
router.delete('/:id', passport.authenticate('bearer', { session: false }), function(req, res, next){
  Project.removeProject(req.params.id).then(project => res.send(project)).catch(err => res.send(err));
});
router.put('/:id', passport.authenticate('bearer', { session: false }), function(req, res, next){
  Project.updateProject(req.params.id, req.body).then(project => res.send(project)).catch(err => res.send(err));
});

module.exports = router;
