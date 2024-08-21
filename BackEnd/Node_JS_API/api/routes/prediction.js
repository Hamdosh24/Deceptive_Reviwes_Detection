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

    const formattedInputTexts = inputTexts.map(text => ({ text }));

    try {
        const response = await axios.post('http://0.0.0.0:3000/predict', { inputTexts: formattedInputTexts });

        const newPrediction = new Prediction({
            userId: userId,  
            inputTexts: inputTexts,
            labels: response.data.map(item => item.label)
        });

        await newPrediction.save();

        const reviewsWithDetails = response.data.map((item, index) => {
            const text = item.text || 'No text';
            const label = item.label || 'No label';
            const time = Date.now();
            logUsage(userId,'predictionService', {text, label }, time); 
            AdminlogUsage(userId, 'predictionService', {text, label },time);



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








