const express = require('express');
const router = express.Router();
const axios = require('axios');
const ScrapPredict = require('../models/ScrapPredict'); // استيراد الموديل
const { logUsage } = require('../services/logService'); // تأكد من مسار الملف الصحيح
const { AdminlogUsage } = require('../services/AdminlogService'); // تأكد من مسار الملف الصحيح
const checkAuth = require('../middleware/authMiddleware');



async function processScrapingAndPrediction(scrapUrl, req, res) {
    try {
        const { id, url } = req.body;
        const userId = req.userData.id || req.userData.userId;
        const time = Date.now();

        // تسجيل الاستخدام
        await logUsage(userId, 'scrap And Predict Service', { url }, time);
        await AdminlogUsage(userId, 'scrap And Predict Service', { url }, time);

        // تخزين id و url في MongoDB
        await ScrapPredict.create({ id, url });

        // طلب البيانات من خدمة scraping
        const response = await axios.post(scrapUrl, { id, url });

        // تحقق من البيانات المستلمة
        console.log('Response from scrap service:', response.data);

        // استخراج المراجعات
        const reviews = response.data.Reviews ? response.data.Reviews.map(review => ({
            text: review.Text,
            rating: review.Ratting
        })) : [];

        const inputTexts = reviews.map(review => review.text);

        console.log('Sending inputTexts to prediction:', inputTexts);

        // إرسال النصوص إلى خدمة التنبؤ
        axios.post('http://0.0.0.0:3000/predict_url', { inputTexts })
            .then(predictionResponse => {
                console.log('Response from external service:', predictionResponse.data);

                // تحقق من تنسيق الاستجابة
                const predictionData = predictionResponse.data.reviews_info;
                const mostCommonWords = predictionResponse.data.most_common_words;
                const nounAndAdj = predictionResponse.data.noun_and_adj

                if (Array.isArray(predictionData)) {
                    // الربط بين المراجعات والنتائج المتوقعة
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



// Route for welcomesaudi
router.post('/welcomesaudi', checkAuth, async (req, res) => {
    await processScrapingAndPrediction('http://localhost:5000/scrap/welcomesaudi', req, res);
});

// Route for ebay/seller
router.post('/ebay/seller', checkAuth, async (req, res) => {
    await processScrapingAndPrediction('http://localhost:5000/scrap/ebay/seller', req, res);
});

// Route for ebay/proudect
router.post('/ebay/proudect', checkAuth, async (req, res) => {
    await processScrapingAndPrediction('http://localhost:5000/scrap/ebay/proudect', req, res);
});

module.exports = router;