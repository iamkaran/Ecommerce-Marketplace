var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    handle: {type: String},
    fname: {type: String},
    lname: {type: String},
    email: {type: String},
    birthdate: {type: String, default: ''},
    password: {type: String},
    location: {type: String, default: ''},
    contact: {type: String, default: ''},
    lastlogin: {type: String, default: ''},

});
var User = mongoose.model('User', UserSchema);


module.exports = User;