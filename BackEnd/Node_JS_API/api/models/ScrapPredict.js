const mongoose = require('mongoose');


const scrapPredictSchema = new mongoose.Schema({
    url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const ScrapPredictResult = mongoose.model('ScrapPredictResult', scrapPredictSchema);

module.exports = ScrapPredictResult;
