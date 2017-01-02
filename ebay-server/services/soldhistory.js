/**
 * Created by karan on 11/3/2016.
 */

var User = require('../models/user');
var Transaction = require('../models/transaction');
var Product = require('../models/product');
var ObjectId = require('mongoose').Types.ObjectId;

exports.soldhistory_request = function (msg, callback) {

    var userId = msg.userId;
    Product.find({sellerId: userId}, '_id', function (err, results) {
        if (err) {
            throw err;
        }
        else {
            var temp = [];
            for (var i = 0; i < results.length; i++) {
                temp.push(new ObjectId(results[i]._id));
            }

            Transaction
                .find({productId: {$in: temp}})
                .populate('productId')
                .exec(function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        callback(null, results);
                    }

                });
        }
    });

};