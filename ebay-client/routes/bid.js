var express = require('express');
var ejs = require('ejs');
var winston = require('./trackuser');
var Product = require('../models/product');
var Bid = require('../models/bid');
var ObjectId = require('mongoose').Types.ObjectId;
var mq_client = require('../rpc/client');

exports.updateBasePrice = function (req, res, next) {
    winston.bidlog("User having id: " + req.session.userid + " placed bid of $ " + req.param("bidAmount") + " on product having id:" + req.param("productId"));
    var bidAmount = parseInt(req.param("bidAmount"));
    var msg_payload = {

        id: new ObjectId(req.param("productId")),
        productPrice: bidAmount,
        userId: req.session.userid,
        amount: bidAmount,
        time: Math.floor(Date.now() / 1000),
        productId: req.param("productId")
    };


    mq_client.make_request('updateBasePrice_queue', msg_payload, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("OK");
        }
    });
};
