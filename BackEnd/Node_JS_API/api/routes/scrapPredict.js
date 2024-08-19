const express = require('express');
const router = express.Router();
const axios = require('axios');
const ScrapPredict = require('../models/ScrapPredict'); // استيراد الموديل
const { logUsage } = require('../services/logService'); // تأكد من مسار الملف الصحيح
const checkAuth = require('../middleware/authMiddleware');


async function processScrapingAndPrediction(scrapUrl, req, res) {
    try {
        const { id, url } = req.body;

        await logUsage(id, 'scrap And Predict Service', { url });

        // تخزين id والرابط في MongoDB
        await ScrapPredict.create({ id, url });

        // طلب البيانات من خدمة السكربينغ
        const response = await axios.post(scrapUrl, { id, url });

        // تحقق من البيانات المستلمة
        console.log('Response from scrap service:', response.data);

        // استخراج المراجعات
        const reviews = response.data.Reviews ? response.data.Reviews.map(review => ({
            text: review.Text,
            rating: review.Ratting
        })) : [];

        // إرسال المراجعات إلى خدمة prediction
        // إرسال المراجعات إلى خدمة prediction
// إرسال المراجعات إلى خدمة prediction
const inputTexts = reviews.map(review => ({ text: review.text }));

console.log('Sending inputTexts to prediction:', inputTexts);

axios.post('http://0.0.0.0:3000/predict', { inputTexts })
    .then(predictionResponse => {
        console.log('Response from external service:', predictionResponse.data);

        // تأكد من أن predictionResponse.data هو قائمة تحتوي على العناصر المتوقعة
        if (Array.isArray(predictionResponse.data)) {
            // الربط بين المراجعات والنتائج المتوقعة
            const reviewsWithLabels = reviews.map((review, index) => ({
                text: review.text,
                rating: review.rating,
                label: predictionResponse.data[index]?.label || 'No label',
                pred_vec: predictionResponse.data[index]?.pred_vec || 'No pred_vec',
                polarity: predictionResponse.data[index]?.polarity || 'No polarity'
            }));

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
router.post('/welcomesaudi',checkAuth, async (req, res) => {
    await processScrapingAndPrediction('http://localhost:5000/scrap/welcomesaudi', req, res);
});

// Route for ebay/seller
router.post('/ebay/seller',checkAuth, async (req, res) => {
    await processScrapingAndPrediction('http://localhost:5000/scrap/ebay/seller', req, res);
});

// Route for ebay/proudect
router.post('/ebay/proudect',checkAuth, async (req, res) => {
    await processScrapingAndPrediction('http://localhost:5000/scrap/ebay/proudect', req, res);
});

module.exports = router;
