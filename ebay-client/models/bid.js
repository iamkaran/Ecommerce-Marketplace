var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BidSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    amount: {type: Number},
    time: {type: String},
    productId: {type: Schema.Types.ObjectId, ref: 'Product'}

});
var Bid = mongoose.model('Bid', BidSchema);


module.exports = Bid;