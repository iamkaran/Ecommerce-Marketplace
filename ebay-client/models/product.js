var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    productName: {type: String},
    productDescription: {type: String},
    productPrice: {type: Number},
    sellerId: {type: Schema.Types.ObjectId, ref: 'User'},
    forBid: {type: Number, default: ''},
    shippedFrom: {type: String},
    quantity: {type: Number, default: ''},
    createdTime: {type: String, default: ''},
    bidCompleteTime: {type: String, default: ''},
    isBidComplete: {type: Number, default: '0'}
});
var Product = mongoose.model('Product', ProductSchema);


module.exports = Product;