const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    
    inputTexts: {
        type: [String], 
        required: true
    },
    labels: {
        type: [String], 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

const Prediction = mongoose.model('Prediction', predictionSchema);
module.exports = Prediction;

