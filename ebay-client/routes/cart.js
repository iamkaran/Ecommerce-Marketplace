var express = require('express');
var ejs = require('ejs');
var winston = require('./trackuser');
var Cart = require('../models/cart');
var ObjectId = require('mongoose').Types.ObjectId;
var mq_client = require('../rpc/client');


exports.addCart = function (req, res, next) {
    winston.userTrack("User having id: " + req.session.userid + " added product having id: " + req.param("productId") + " and quantity " + req.param("quantity") + " in the shopping cart.");
    var msg_payload = {
        "quantity": req.param("quantity"),
        "total": req.param("totalPrice"),
        "productId": req.param("productId"),
        "userId": req.session.userid
    };

    mq_client.make_request('addCart_queue', msg_payload, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("OK");
        }
    });

};


exports.renderCart = function (req, res, next) {

    res.render('cart');

};

exports.getCartData = function (req, res, next) {

    var msg_payload = {
        userId: req.session.userid
    };
    mq_client.make_request('getCartData_queue', msg_payload, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(results);
        }
    });
};


exports.updateCart = function (req, res, next) {
    winston.userTrack("User having id:" + req.session.userid + " updated the cart");
    var quantity = req.param("quantity");
    var price = req.param("price");
    var msg_payload = {
        quantity: req.param("quantity"),
        productId: new ObjectId(req.param("pid")),
        userId: new ObjectId(req.session.userid),
        total: quantity * price
    };

    mq_client.make_request('updateCart_queue', msg_payload, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("OK");
        }
    });

};

exports.deleteCartItem = function (req, res, next) {
    winston.userTrack("User having id:" + req.session.userid + " removed an item from the cart");
    var msg_payload = {
        id: req.param("cartid")
    };

    mq_client.make_request('deleteCart_queue', msg_payload, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("OK");
        }
    });
};


exports.checkOutData = function (req, res, next) {
    var total = req.param("grandTotal");
    req.session.grandTotal = total;
    console.log(req.session.grandTotal);
    res.send("OK");

};

exports.checkOutPage = function (req, res, next) {

    res.render("checkout");

};