var express = require('express');
var ejs = require('ejs');
var winston = require('./trackuser');
var User = require('../models/user');
var Transaction = require('../models/transaction');
var Product = require('../models/product');
var ObjectId = require('mongoose').Types.ObjectId;
var mq_client = require('../rpc/client');

exports.orderhistory = function (req, res, next) {
    winston.userTrack("User having id: " + req.session.userid + " viewed his purchase history");

    var msg_payload = {
        userId: new ObjectId(req.session.userid)
    };

    mq_client.make_request('orderhistory_queue', msg_payload, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(results);
        }
    });


};

exports.orderhistorypage = function (req, res, next) {


    res.render('orderhistory');
};


exports.soldhistory = function (req, res, next) {
    winston.userTrack("User having id: " + req.session.userid + " viewed his Sold items");
    var msg_payload = {
        userId: req.session.userid
    };

    mq_client.make_request('soldhistory_queue', msg_payload, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(results);
        }
    });
};

exports.soldhistorypage = function (req, res, next) {

    res.render('soldhistory');
};
