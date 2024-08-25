const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');

const Prediction = require('../models/Prediction');
const { logUsage } = require('../services/logService');
const { AdminlogUsage } = require('../services/AdminlogService'); 

const checkAuth = require('../middleware/authMiddleware');

router.post('/', checkAuth, async (req, res) => {
    const userId = req.userData.id || req.userData.userId; 
    if (!userId) {
        return res.status(400).json({ error: 'User ID is missing' });
    }

    const inputTexts = req.body.inputTexts;

    if (!inputTexts || !Array.isArray(inputTexts)) {
        return res.status(400).json({ error: 'Data is required' });
    }

    // تحويل النصوص إلى الشكل المناسب إذا لزم الأمر
const formattedInputTexts = inputTexts.map(text => text.text || text);

    try {
        const response = await axios.post('http://0.0.0.0:3000/predict_text', { inputTexts: formattedInputTexts });

        // تسجيل الاستجابة للتحقق من نوع البيانات
        console.log('Response data:', response.data);

        // التأكد من أن response.data هو مصفوفة
        if (!Array.isArray(response.data.reviews_info)) {
            throw new Error('Expected response.data.reviews_info to be an array');
        }

        const newPrediction = new Prediction({
            userId: userId,
            inputTexts: inputTexts,
            labels: response.data.reviews_info.map(item => item.label)
        });

        await newPrediction.save();

        const reviewsWithDetails = response.data.reviews_info.map((item, index) => {
            const text = item.text || 'No text';
            const label = item.label || 'No label';
            const time = Date.now();
            logUsage(userId, 'predictionService', { text, label }, time);
            AdminlogUsage(userId, 'predictionService', { text, label }, time);

            return {
                text: text,
                label: label,
                pred_vec: item.pred_vec || 'No pred_vec',
                polarity: item.polarity || 'No polarity'
            };
        });

        res.status(200).json({
            message: 'Data received and stored successfully',
            reviewsWithDetails
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error processing the request' });
    }
});

module.exports = router;




// {
//     "inputTexts": [
//         "كريم قلاش",
//         "النص الثاني",
//         "النص الثالث"
//     ]
// }





















