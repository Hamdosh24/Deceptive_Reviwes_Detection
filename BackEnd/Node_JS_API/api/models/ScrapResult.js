

const mongoose = require('mongoose');

const scrapResultSchema = new mongoose.Schema({
    url: { type: String, required: true },
    createdAt: {type: Date, default: Date.now }
});

const ScrapResult = mongoose.model('ScrapResult', scrapResultSchema);

module.exports = ScrapResult;
