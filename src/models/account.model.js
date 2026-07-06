const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    status: {
        type:String,
        enum: {
            values: ['active', 'inactive', 'closed'],
            message: 'Status must be either active, inactive, or closed',
        }, 
        default: 'active'
    },
    currency: {
        type: String,
        required: true,
        default: 'INR',
    },

},{
    timestamps: true
})

accountSchema.index({ user: 1, status: 1 });

const accountModel = mongoose.model('Account', accountSchema);
module.exports = accountModel;