// transactionModel.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,  // e.g., 'deposit', 'withdrawal', 'bet_placement', 'bet_payout'
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    details: {
        type: String  // additional details about the transaction
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
