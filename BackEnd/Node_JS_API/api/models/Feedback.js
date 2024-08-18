const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);