var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    productId: {type: Schema.Types.ObjectId, ref: 'Product'},
    buyerId: {type: Schema.Types.ObjectId, ref: 'User'},
    amount: {type: Number},
    grandTotal: {type: Number},
    quantity: {type: Number},
    isCreated: {type: String}
});
var Transaction = mongoose.model('Transaction', TransactionSchema);


module.exports = Transaction;