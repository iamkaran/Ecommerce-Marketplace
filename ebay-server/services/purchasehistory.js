/**
 * Created by karan on 11/3/2016.
 */
var Transaction = require('../models/transaction');
var Product = require('../models/product');

exports.orderhistory_request = function (msg, callback) {

    Transaction
        .find({buyerId: msg.userId})
        .populate('productId')
        .exec(function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                callback(null, results);
            }

        });
};