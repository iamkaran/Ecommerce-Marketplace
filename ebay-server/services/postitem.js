/**
 * Created by karan on 11/2/2016.
 */

var Product = require('../models/product');

function postItem_request(msg, callback) {

    var res = {};
    var product = new Product();
    product.bidCompleteTime = msg.bidCompleteTime;
    product.createdTime = msg.createdTime;
    product.productName = msg.productName;
    product.productDescription = msg.productDescription;
    product.shippedFrom = msg.shippedFrom;
    product.forBid = msg.forBid;
    product.productPrice = msg.productPrice;
    product.quantity = msg.quantity;
    product.sellerId = msg.sellerId;
    product.save(function (err) {
        if (err) {
            callback(err, res);
        }
        else {
            res.code = 200;
            callback(null, res);
        }
    });


}

exports.postItem_request = postItem_request;
