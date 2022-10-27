const mongoose = require('mongoose');

const Law = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        enum: ['published', 'archived'],
        default: 'published',
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Law', Law);