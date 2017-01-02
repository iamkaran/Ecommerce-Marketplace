/**
 * Created by karan on 11/2/2016.
 */
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');


function login_request(msg, callback) {

    var username = msg.username;
    var password = msg.password;

    User.findOne({email: username}, function (err, user) {
        if (err) {
            return callback(err);
        }
        if (!user) {
            return callback(null, false);
        }
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                callback(null, user);
            } else {
                return callback(null, false);
            }
        }

    });

}


function signOut_request(msg, callback) {

    var id = msg.id;
    var time = msg.time;

    var conditions = {_id: id};
    var update = {
        'lastlogin': time
    };
    User.update(conditions, update, function (err, results) {

        if (err) {
            throw err;
        } else {
            callback(null, results);
        }
    });
}

exports.checkEmail_request = function (msg, callback) {

    var email = msg.email;
    User.find({email: email}, function (err, results) {
        if (err) {
            throw err;
        }
        else {

            callback(null, results);
        }
    });
};
exports.login_request = login_request;
exports.signOut_request = signOut_request;