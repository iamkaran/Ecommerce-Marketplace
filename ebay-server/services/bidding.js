/**
 * Created by karan on 11/5/2016.
 */
var Product = require('../models/product');
var Bid = require('../models/bid');


exports.updateBasePrice_request = function (msg, callback) {
    var res = {};
    var bid = new Bid();
    var id = msg.id;
    var productPrice = msg.productPrice;
    bid.userId = msg.userId;
    bid.amount = msg.amount;
    bid.time = msg.time;
    bid.productId = msg.productId;

    var conditions = {_id: id};
    var update = {
        'productPrice': productPrice
    };
    Product.update(conditions, update, function (err, results) {

        if (err) {
            throw err;

        } else {

            callback(null, results);
        }
    });

    bid.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.code = 200;
            callback(null, res);
        }
    });
};

