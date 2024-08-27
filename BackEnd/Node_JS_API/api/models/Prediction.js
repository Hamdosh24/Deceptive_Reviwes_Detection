const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    predictions: [{
        id: {
            type: Number,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true 
        }
    }],
    timestamp: {
        type: Date,
        default: Date.now 
    }
});



const Prediction = mongoose.model('Prediction', predictionSchema);
module.exports = Prediction;
