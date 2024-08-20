const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    
    inputTexts: {
        type: [String], // مصفوفة من النصوص
        required: true
    },
    labels: {
        type: [String], // مصفوفة من التصنيفات
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // لتخزين تاريخ الإنشاء
    }
});

const Prediction = mongoose.model('Prediction', predictionSchema);
module.exports = Prediction;

