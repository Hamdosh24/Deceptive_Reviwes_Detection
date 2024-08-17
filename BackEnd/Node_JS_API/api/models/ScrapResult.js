const mongoose = require('mongoose');

const scrapResultSchema = new mongoose.Schema({
    id: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    label: { type: String, required: true } // يجب أن يكون النص
});


const ScrapResult = mongoose.model('ScrapResult', scrapResultSchema);

module.exports = ScrapResult;
