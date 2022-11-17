const mongoose = require('mongoose');

const Token = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    useLeft: {
        type: Number,
        default: 50,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Token', Token);