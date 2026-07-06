const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
        index: true
    },
    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
        index: true
    },
    status: {
        type: string,
        enum: {
            values: ['pending', 'completed', 'failed', 'reversed'],
            message: 'Status must be either pending, completed, failed, or reversed',
        },
        default: 'pending'
    },
    amount: {
        type: Number,
        required: [true,"Amount is required for creating a transaction"],
        min: [0, "Amount must be a positive number"]
    },
    idempotencyKey: {
        type: String,
        required: [true, "Idempotency key is required for creating a transaction"],
        unique: true,
        index: true
    }
}, {
        timestamps: true
})

const transactionModel = mongoose.model('Transaction', transactionSchema);
module.exports = transactionModel;