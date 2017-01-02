/**
 * Created by karan on 11/3/2016.
 */

var Cart = require('../models/cart');


function addCart_request(msg, callback) {

    var res = {};
    var cart = new Cart();
    cart.quantity = msg.quantity;
    cart.total = msg.total;
    cart.productId = msg.productId;
    cart.userId = msg.userId;
    cart.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {

            res.code = 200;
            callback(null, res);
        }
    });
}


function getCartData_request(msg, callback) {

    var userId = msg.userId;
    Cart
        .find({userId: userId})
        .populate('productId')
        .populate('userId')
        .exec(function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                callback(null, results);
            }

        });
}


function updateCart_request(msg, callback) {

    var conditions = {userId: msg.userId, productId: msg.productId};
    var update = {
        'quantity': msg.quantity,
        'total': msg.total

    };
    Cart.update(conditions, update, function (err, results) {

        if (err) {
            throw err;
        } else {
            callback(null, results);
        }
    });
}

function deleteCart_request(msg, callback) {
    var res = {};
    Cart.findByIdAndRemove(msg.id,function (err) {
        if (err) {
            throw err;
        }
        else {
            res.code = 200;
            callback(null,res);
        }

    });
}
exports.addCart_request = addCart_request;
exports.getCartData_request = getCartData_request;
exports.updateCart_request = updateCart_request;
exports.deleteCart_request = deleteCart_request;