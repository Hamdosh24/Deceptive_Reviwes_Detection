// const mongoose = require('mongoose');

// const predictionSchema = new mongoose.Schema({
    
//     inputTexts: {
//         type: [String], 
//         required: true
//     },
//     labels: {
//         type: [String], 
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now 
//     }
// });

// const Prediction = mongoose.model('Prediction', predictionSchema);
// module.exports = Prediction;


const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // إذا لم تكن بحاجة إلى userId، اجعلها اختياري
    },
    inputTexts: {
        type: Array,
        required: true // تأكد من أن البيانات تُرسل في الشكل الصحيح
    },
    labels: {
        type: [String],
        required: true // تأكد من أن labels موجودة
    }
});

const Prediction = mongoose.model('Prediction', predictionSchema);
module.exports = Prediction;
