const express = require('express');
const router = express.Router();
const axios = require('axios');

const ScrapResult = require('../models/ScrapResult'); // استيراد الموديل

// WelcomeSaudi Scraper
// router.post('/welcomesaudi', async (req, res) => {
//     try {
//         const response = await axios.post('http://localhost:5000/scrap/welcomesaudi', {
//             id: req.body.id,
//             url: req.body.url
//         });

//         // فقط الاحتفاظ بالمراجعات التي تحتوي على text و rating
//         const reviews = response.data.Reviews.map(review => ({
//             text: review.Text,
//             rating: review.Ratting
//         }));

//         const scrapResult = new ScrapResult({
//             id: req.body.id,
//             url: req.body.url,
//             reviews: reviews
//         });

//         await scrapResult.save();

//         res.status(200).json({
//             id: scrapResult.id,
//             url: scrapResult.url,
//             reviews: scrapResult.reviews
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });


// eBay Scraper
router.post('/ebay', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5000/scrap/ebay', {
            id: req.body.id,
            url: req.body.url
        });

        const scrapResult = new ScrapResult({
            id: req.body.id,
            url: req.body.url,
            reviews: response.data.Reviews
        });

        await scrapResult.save();

        res.status(200).json(scrapResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Amazon Scraper



router.post('/welcomesaudi', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5000/scrap/welcomesaudi', {
            id: req.body.id,
            url: req.body.url
        });

        // تحقق من البيانات المستلمة
        console.log('Response from scrap service:', response.data);

        // استخراج المراجعات
        const reviews = response.data.Reviews ? response.data.Reviews.map(review => ({
            text: review.Text,
            rating: review.Ratting
        })) : []; // اجعلها مصفوفة فارغة إذا لم توجد مراجعات

        // بعد الحفظ، إرسال المراجعات إلى خدمة `prediction`
        const inputTexts = reviews.map(review => review.text);

        console.log('Sending inputTexts to prediction:', inputTexts);

        // إرسال طلب إلى خدمة prediction واستخدام then/catch للتعامل مع الرد
        axios.post('http://0.0.0.0:3000/predict', { inputTexts })
            .then(async predictionResponse => {
                console.log('Response from external service:', predictionResponse.data);
                // الربط بين المراجعات والنتائج المتوقعة
                const reviewsWithLabels = reviews.map((review, index) => ({
                    id: req.body.id,
                    text: review.text,
                    rating: review.rating,
                    label: predictionResponse.data[index] // افترض أن النتائج في نفس الترتيب
                }));

                // حفظ النتائج في MongoDB
                await ScrapResult.create(reviewsWithLabels);

                // رد مع البيانات المخزنة
                res.status(200).json({
                    message: 'Data received and stored successfully',
                    reviewsWithLabels
                });
            })
            .catch(error => {
                console.error('Error:', error);
                res.status(500).json({ error: 'Error processing the request' });
            });

    } catch (error) {
        console.error('Error occurred:', error); // طباعة الخطأ
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;








