var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var Schema = mongoose.Schema;
const error = require('http-errors-promise');

var userSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    salt: { type: String },
    hash: { type: String },
    token: { type: String },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
})

userSchema.statics.findAll = function(query = {}){
    return this.find(query, { salt: 0, hash: 0 });
}

userSchema.statics.createUser = function(user){
    email = user.email;
    if (email == "undefined" || email == null )
      return error(null, 'email is missing', 400);

    password = user.password;
    if (password == "undefined" || password == null )
      return error(null, 'password is missing', 400);

    newUser = new this(user);
    newUser.setPassword(user.password);
    newUser.role = 'user';
    return newUser.save().catch(function(err){
        return error(err, 'error in saving db', 500);
    });
}

userSchema.statics.removeUser = function(id){
    return this.findOneAndDelete(id);
}

userSchema.statics.userDetails = function(id){
    return  this.findOne({_id: id}).exec();
}

userSchema.statics.logout = function(id){
    return this.findOneAndUpdate(id, { $set: {token: ''} }).exec();
}

userSchema.statics.updateUser = function(id, params){
    return this.findOneAndUpdate(id, { $set: params }).exec();
}

userSchema.methods.setPassword = function(password) {
    password = new Buffer(password, 'binary');
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.verifyPassword = function(password) {
    password  = new Buffer(password, 'binary')
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.getToken = function() {
    return this.token;
};

userSchema.methods.setToken = function() {
    token = crypto.randomBytes(16).toString('hex');
    this.token = token;
    this.save();
};

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);