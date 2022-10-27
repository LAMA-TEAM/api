const mongoose = require('mongoose');

const Vote = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    law: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Law',
    },
    vote: {
        type: String,
        enum: ['up', 'down', 'neutral'],
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Vote', Vote);