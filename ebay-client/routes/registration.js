/**
 * Created by karan on 11/1/2016.
 */

var ejs = require('ejs');
var bcrypt = require('bcrypt-nodejs');
var winston = require('./trackuser');
var User = require('../models/user');
var passport = require('passport');
var mq_client = require('../rpc/client');


exports.loginpage = function (req, res, next) {
    res.render('login');
};


function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;

}

exports.registration = function (req, res, next) {
    winston.userTrack("New user Registration");
    var password = req.param("password");
    var msg_payload = {
        "fname": req.param("fn"),
        "lname": req.param("ln"),
        "email": req.param("email"),
        "handle": req.param("handle"),
        "password": bcrypt.hashSync(password)

    };

    mq_client.make_request('registration_queue', msg_payload, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("OK");
        }
    });

};

exports.loginPassport = function (req, res, next) {


    passport.authenticate('login', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send("invalid");
        }
        if (user) {
            req.session.userid = user._id;
            return res.send("done");
        }
    })(req, res, next);

};
