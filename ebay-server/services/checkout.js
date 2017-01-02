/**
 * Created by karan on 11/3/2016.
 */

var User = require('../models/user');
var Transaction = require('../models/transaction');
var Product = require('../models/product');
var Cart = require('../models/cart');
var ObjectId = require('mongoose').Types.ObjectId;

exports.getShippingDetails_request = function (msg, callback) {

    User.find({
        _id: msg.id
    }, function (err, results) {
        if (err) {
            throw err;
        } else {
            var grandTotal = msg.grandTotal;
            results.push({
                grandTotal: grandTotal
            });

            callback(null, results);
        }
    });

};


exports.payment_request = function (msg, callback) {
    "use strict";
    var res = {};
    Cart.find({
        userId: msg.userId
    }, function (err, cart) {
        if (err) {
            throw err;
        } else {
            for (let i = 0; i < cart.length; i++) {

                var transaction = new Transaction();
                transaction.productId = cart[i].productId;
                transaction.buyerId = cart[i].userId;
                transaction.amount = cart[i].total;
                transaction.grandTotal = msg.grandTotal;
                transaction.quantity = cart[i].quantity;
                transaction.isCreated = Date.now();
                transaction.save(function (err) {
                    if (err) {
                        console.log(err);
                    } else {

                        Product.find({
                            _id: cart[i].productId
                        }, function (err, productQuantity) {
                            if (err) {
                                throw err;
                            } else {

                                var conditions = {
                                    _id: new ObjectId(cart[i].productId)
                                };
                                var update = {
                                    'quantity': productQuantity[0].quantity - cart[i].quantity

                                };
                                Product.update(conditions, update, function (err, results) {

                                    if (err) {
                                        throw err;
                                    } else {


                                        Cart.find({
                                            productId: cart[i].productId,
                                            userId: cart[i].userId
                                        }, function (err, user) {
                                            if (err) {
                                                throw err;
                                            } else {
                                                Cart.remove(function (err) {
                                                    if (err) {
                                                        throw err;
                                                    } else {
                                                        console.log("deleted");
                                                    }


                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
            res.code = 200;
            callback(null, res);
        }
    });
};