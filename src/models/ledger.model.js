const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        required: [ true, "ledger must be associated with account"],
        index: true,
        immutable: true
    },
    amount: {
        type: Number,
        required: [true, "Amount is required for creating a ledger entry"],
        immutable: true
    },
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: [true, "Ledger entry must be associated with a transaction"],
        index: true,
        immutable: true
    },
    type:{
        type: string,
        enum: {
            values: ['credit', 'debit'],
            message: 'Type must be either credit or debit',
        }, required: [true, "Type is required for creating a ledger entry"],
        immutable: true
    }
})

function preventLedgerModification(next) {
    throw new Error("Ledger entries are immutable and cannot be modified or deleted")
}

ledgerSchema.pre('remove', preventLedgerModification);
ledgerSchema.pre('findOneAndUpdate', preventLedgerModification);
ledgerSchema.pre('findOneAndDelete', preventLedgerModification);
ledgerSchema.pre('findOneAndReplace', preventLedgerModification);
ledgerSchema.pre('updateOne', preventLedgerModification);
ledgerSchema.pre('updateMany', preventLedgerModification);
ledgerSchema.pre('deleteMany', preventLedgerModification);
ledgerSchema.pre('deleteOne', preventLedgerModification);

const ledgerModel = mongoose.model('Ledger', ledgerSchema);
module.exports = ledgerModel;