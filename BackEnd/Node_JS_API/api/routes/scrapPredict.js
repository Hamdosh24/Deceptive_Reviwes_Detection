const express = require('express');
const router = express.Router();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const ScrapPredict = require('../models/ScrapPredict');
const { logUsage } = require('../services/logService');

const checkAuth = require('../middleware/authMiddleware');

async function processScrapingAndPrediction(scrapUrl, req, res) {
    try {
        const { url } = req.body;
        const userId = req.userData.id || req.userData.userId;
        const time = Date.now();

        await logUsage(userId, 'Decaptive', 'url', { url }, time);

        const scrapResult = await ScrapPredict.create({ url });

        const response = await axios.post(scrapUrl, { id: scrapResult._id, url });

        const reviews = response.data.Reviews ? response.data.Reviews.map(review => ({
            id: uuidv4(),
            text: review.Text
        })) : [];
       
        const predictionResponse = await axios.post('http://0.0.0.0:3000/predict_url', reviews);

        res.status(200).json(predictionResponse.data);
        
    } catch (error) {
        console.error('Error occurred:', error.message);
        res.status(500).json({ error: error.message });
    }
}



router.post('/Predict_URL', checkAuth, async (req, res) => {
    const { url } = req.body;

    let scrapUrl;

    if (url.includes('welcomesaudi.com')) {
        scrapUrl = 'http://localhost:5000/scrap/welcomesaudi';
    } else if (url.includes('ebay.com')) {
        scrapUrl = 'http://localhost:5000/scrap/ebay/proudect';
    } else if (url.includes('talabat.com/')) {
        scrapUrl = 'http://localhost:5000/scrap/talabat';
    } else {
        return res.status(400).json({ error: 'Unsupported URL' });
    }

    await processScrapingAndPrediction(scrapUrl, req, res);
});

module.exports = router;





// {
//     "id": "duh12",
//     "url": "https://welcomesaudi.com/ar/activity/masjid-shuhada-uhud-madinah"
// }
