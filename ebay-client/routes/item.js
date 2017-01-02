var express = require('express');
var ejs = require('ejs');
var winston = require('./trackuser');
var Product = require('../models/product');
var mq_client = require('../rpc/client');


exports.SellPage = function (req, res, next) {
    winston.userTrack("User having id: " + req.session.userid + " clicked on page to post an advertisement");
    res.render('postItem');
};


exports.postItem = function (req, res, next) {
    winston.userTrack("User having id: " + req.session.userid + " posted an advertisement");
    var bidCompleteTime;
    if (req.param("bidStatus") == 1) {
        bidCompleteTime = Math.floor(Date.now() / 1000) + (96*60*60);
    }
    else {
        bidCompleteTime = "";
    }
    var msg_payload = {

        "bidCompleteTime": bidCompleteTime,
        "createdTime": Math.floor(Date.now() / 1000),
        "productName": req.param("productName"),
        "productDescription": req.param("description"),
        "shippedFrom": req.param("location"),
        "forBid": req.param("bidStatus"),
        "productPrice": req.param("price"),
        "quantity": req.param("quantity"),
        "sellerId": req.session.userid

    };
    mq_client.make_request('postItem_queue', msg_payload, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("OK");
        }
    });


};
