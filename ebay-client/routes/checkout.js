var ejs = require('ejs');
var winston = require('./trackuser');
var User = require('../models/user');
var Transaction = require('../models/transaction');
var Product = require('../models/product');
var Cart = require('../models/cart');
var ObjectId = require('mongoose').Types.ObjectId;
var mq_client = require('../rpc/client');

exports.getShippingDetails = function (req, res, next) {

    var msg_payload = {
        id: new ObjectId(req.session.userid),
        grandTotal: req.session.grandTotal
    };

    mq_client.make_request('getShippingDetails_queue', msg_payload, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(results);
        }
    });

};


exports.payment = function (req, res, next) {

    var msg_payload = {
        userId: new ObjectId(req.session.userid),
        grandTotal: req.session.grandTotal
    };

    mq_client.make_request('payment_queue', msg_payload, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("OK");
        }
    });

};