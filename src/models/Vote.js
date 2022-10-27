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
        type: Number,
        enum: [0, 1],
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Vote', Vote);