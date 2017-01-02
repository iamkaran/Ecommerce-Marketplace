var express = require('express');
var ejs = require('ejs');
var winston = require('./trackuser');
var User = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;
var mq_client = require('../rpc/client');

exports.getprofile = function (req, res, next) {
    winston.userTrack("User having id: " + req.session.userid + " viewed his profile");
    var msg_payload = {
        id: new ObjectId(req.session.userid)
    };

    mq_client.make_request('getprofile_queue', msg_payload, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("profile",
                {
                    results: results
                });
        }
    });

};

exports.updateProfile = function (req, res, next) {
    winston.userTrack("User having id: " + req.session.userid + " updated his profile");
    var msg_payload = {
        id: new ObjectId(req.session.userid),
        "handle": req.param("handle"),
        "contact": req.param("contactinfo"),
        "birthdate": req.param("date"),
        "location": req.param("location")
    };
    mq_client.make_request('updateprofile_queue', msg_payload, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("OK");
        }
    });


};


exports.profile = function (req, res, next) {
    winston.userTrack("User having id: " + req.session.userid + " viewed profile of user having ebayhandle " + req.param("handle"));


    User.find({handle: req.param("handle")}, function (err, results) {
        if (err) {
            throw err;
        }
        else {
            res.render("profilepage",
                {
                    results: results

                });
        }
    });

};