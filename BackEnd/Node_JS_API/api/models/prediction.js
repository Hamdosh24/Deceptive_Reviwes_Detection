// models/Prediction.js

const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Prediction', predictionSchema);
