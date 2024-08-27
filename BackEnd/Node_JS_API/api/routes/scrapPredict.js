const express = require('express');
const router = express.Router();
const axios = require('axios');
const ScrapPredict = require('../models/ScrapPredict');
const { logUsage } = require('../services/logService'); 
const { AdminlogUsage } = require('../services/AdminlogService'); 
const checkAuth = require('../middleware/authMiddleware');


async function processScrapingAndPrediction(scrapUrl, req, res) {
    try {
        const { url } = req.body;
        const userId = req.userData.id || req.userData.userId;
        const time = Date.now();

        await logUsage(userId, 'scrap And Predict Service', { url }, time);
        await AdminlogUsage(userId, 'scrap And Predict Service', { url }, time);

        const scrapResult = await ScrapPredict.create({ url });

        const response = await axios.post(scrapUrl, { id: scrapResult._id, url });

        console.log('Response from scrap service:', response.data);

        const reviews = response.data.Reviews ? response.data.Reviews.map(review => ({
            text: review.Text,
            rating: review.Ratting
        })) : [];

        const inputTexts = reviews.map(review => review.text);

        console.log('Sending inputTexts to prediction:', inputTexts);

        axios.post('http://0.0.0.0:3000/predict_url', { inputTexts })
            .then(predictionResponse => {
                console.log('Response from external service:', predictionResponse.data);

                const predictionData = predictionResponse.data.reviews_info;
                const mostCommonWords = predictionResponse.data.most_common_words;
                const nounAndAdj = predictionResponse.data.noun_and_adj;

                if (Array.isArray(predictionData)) {
                    const reviewsWithLabels = reviews.map((review, index) => ({
                        text: review.text,
                        rating: review.rating,
                        label: predictionData[index]?.label || 'No label',
                        pred_vec: predictionData[index]?.pred_vec || 'No pred_vec',
                        polarity: predictionData[index]?.polarity || 'No polarity',
                    }));

                    console.log('Most Common Words:', mostCommonWords);
                    console.log('Nouns and Adjectives:', nounAndAdj);

                    res.status(200).json({
                        message: 'Data received and processed successfully',
                        reviewsWithLabels
                    });
                } else {
                    throw new Error('Unexpected response format from prediction service');
                }
            })
            .catch(error => {
                console.error('Error:', error.response ? error.response.data : error.message);
                res.status(500).json({ error: 'Error processing the request' });
            });

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: error.message });
    }
}


router.post('/', checkAuth, async (req, res) => {
    const { url } = req.body;

    let scrapUrl;

    if (url.includes('welcomesaudi.com')) {
        scrapUrl = 'http://localhost:5000/scrap/welcomesaudi';
    } else if (url.includes('ebay.com')) {
        scrapUrl = 'http://localhost:5000/scrap/ebay/proudect';
    }else if(url.includes('talabat.com/')){
        scrapUrl='http://localhost:5000/scrap/talabat';
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
