var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
    productId: {type: Schema.Types.ObjectId, ref: 'Product'},
    quantity: {type: Number},
    total: {type: Number},
    userId: {type: Schema.Types.ObjectId, ref: 'User'}

});
var Cart = mongoose.model('Cart', CartSchema);


module.exports = Cart;