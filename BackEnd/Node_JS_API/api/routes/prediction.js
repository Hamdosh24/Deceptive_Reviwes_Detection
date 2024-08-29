const express = require('express');
const router = express.Router();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { logUsage } = require('../services/logService');

const checkAuth = require('../middleware/authMiddleware');


router.post('/Predict_Text', checkAuth, async (req, res) => {
    const userId = req.userData.id || req.userData.userId;
    const inputTexts = req.body;

    console.log('Received inputTexts:', inputTexts);

    try {
        const formattedInputTexts = inputTexts.map(item => ({
            id: uuidv4(),
            text: item.text,
        }));
        
        const predictionResponse = await axios.post('http://0.0.0.0:3000/predict_text', formattedInputTexts);
        
        const text = inputTexts.map(item => item.text).join(', ');

        logUsage(userId, 'Decaptive','text', { text });

        res.status(200).json(predictionResponse.data);

    } catch (error) {
        console.error('Error:', error.message);
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




















