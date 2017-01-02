var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var flash = require('connect-flash');
var bcrypt = require('bcrypt-nodejs');
var mq_client = require('../rpc/client');

module.exports = function (passport) {
    passport.use('login', new LocalStrategy({

        usernameField: 'email',
        passwordField: 'password'

    }, function (username, password, done) {
        var msg_payload = {"username": username, "password": password};

        mq_client.make_request('login_queue', msg_payload, function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                done(null, results);
            }
        });


    }));
};