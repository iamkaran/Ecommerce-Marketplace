/**
 * Created by karan on 11/2/2016.
 */
var Product = require('../models/product');


function fetchAdvertisements_request(msg, callback) {

    var sellerId = msg.sellerId;
    Product.find({
        sellerId: {$ne: sellerId},
        isBidComplete: '0',
        quantity: {$gt: 0}
    }, function (err, results) {
        if (err) {
            throw err;
        }
        else {
            callback(null, results);
        }
    });

}


function advertisementDetails_request(msg, callback) {
    var productId = msg.productId;
    Product
        .find({_id: productId})
        .populate('sellerId')
        .exec(function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                callback(null, results);
            }

        });

}

exports.fetchAdvertisements_request = fetchAdvertisements_request;
exports.advertisementDetails_request = advertisementDetails_request;