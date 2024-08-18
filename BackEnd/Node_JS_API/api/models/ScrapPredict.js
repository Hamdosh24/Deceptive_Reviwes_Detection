const mongoose = require('mongoose');

const scrapPredictSchema = new mongoose.Schema({
    id: { type: String, required: true },
    url: { type: String, required: true },
    createdAt: {type: Date,default: Date.now }
});

const ScrapPredictResult = mongoose.model('ScrapPredictResult', scrapPredictSchema);

module.exports = ScrapPredictResult;
