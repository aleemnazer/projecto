var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user.model');

var projectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    creator: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

projectSchema.statics.findAll = function(user){
    return this.find({creator: user._id}).populate('creator');
}

projectSchema.statics.createProject = function(project){
    var new_project = new this(project);
    this.pushToCreator(new_project);
    return new_project.save();
}

projectSchema.statics.pushToCreator = function(project){
    promise = User.findById(project.creator).exec();
    promise.then(function(user){
        user.projects.push(project);
        user.save();
    });
}

projectSchema.statics.removeProject = function(id){
    return this.findOneAndDelete(id);
}

projectSchema.statics.projectDetails = function(id){
    return this.findOne({ _id: id }).populate('creator').exec();
}

projectSchema.statics.updateProject = function(id, params){
    return this.findOneAndUpdate(id, { $set: params }, function(project){
        return project;
    });
}

module.exports = mongoose.model('Project', projectSchema);