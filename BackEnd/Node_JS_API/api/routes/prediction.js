const express = require('express');
const router = express.Router();
const axios = require('axios');

const Prediction = require('../models/Prediction');
const { logUsage } = require('../services/logService');
const { AdminlogUsage } = require('../services/AdminlogService'); 

const checkAuth = require('../middleware/authMiddleware');

router.post('/', checkAuth, async (req, res) => {
    const userId = req.userData.id || req.userData.userId;
 
    const inputTexts = req.body;


    if (!inputTexts || !Array.isArray(inputTexts)) {
        return res.status(400).json({ error: 'Data is required and must be an array' });
    }

    try {
        const formattedInputTexts = inputTexts.map(item => item.text);
        const response = await axios.post('http://0.0.0.0:3000/predict_text', { inputTexts: formattedInputTexts });

        console.log('Response data:', response.data);

        if (!Array.isArray(response.data.reviews_info)) {
            throw new Error('Expected response.data.reviews_info to be an array');
        }

        const labels = response.data.reviews_info.map(item => item.label);

        const newPrediction = new Prediction({
            userId: userId,
            inputTexts: inputTexts,
            labels: labels,
            timestamp: new Date() 
        });

        await newPrediction.save();


        const reviewsWithDetails = response.data.reviews_info.map((item, index) => {
            const text = inputTexts[index].text;
            const label = item.label || 'No label';
            const time = Date.now();
            logUsage(userId, 'predictionService', { text, label }, time);
            AdminlogUsage(userId, 'predictionService', { text, label }, time);

            return {
                id: inputTexts[index].id,
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


// [
//     {
//         "text": "هو جيد بس ما عرفت كيف استخدمه 💀 "
//     },
//     {
//         "text": "جيدة وتقص كل شي"
//     }
// ]




















