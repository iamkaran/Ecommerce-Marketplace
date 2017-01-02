/**
 * Created by karan on 11/2/2016.
 */

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');


function registration_request(msg, callback) {

    var res = {};
    var user = new User();
    user.fname = msg.fname;
    user.lname = msg.lname;
    user.email = msg.email;
    user.handle = msg.handle;
    user.password = msg.password;

    user.save(function (err) {
        if (err) {
            callback(err, res);
        }
        else {

            res.code = 200;
            callback(null, res);
        }
    });


}

exports.registration_request = registration_request;