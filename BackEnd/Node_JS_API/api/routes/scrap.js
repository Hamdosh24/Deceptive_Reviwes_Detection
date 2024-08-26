const express = require('express');
const router = express.Router();
const axios = require('axios');
const ScrapResult = require('../models/ScrapResult'); // استيراد الموديل
const { logUsage } = require('../services/logService'); // تأكد من مسار الملف الصحيح
const { AdminlogUsage } = require('../services/AdminlogService'); // تأكد من مسار الملف الصحيح
const checkAuth = require('../middleware/authMiddleware');




async function processScraping(scrapUrl, req, res) {
    try {
        const userId = req.userData.id || req.userData.userId;  // تأكد من وجود userId في التوكن
        const { id, url } = req.body;
        const time= Date.now

      
        await AdminlogUsage(userId, 'scraping Service', { url },time);
        await logUsage(userId, 'scraping Service', { url },time);



        // تخزين id والرابط في MongoDB
        await ScrapResult.create({ id, url });

        // طلب البيانات من خدمة السكربينغ
        const response = await axios.post(scrapUrl, { id, url });

        // تحقق من البيانات المستلمة
        console.log('Response from scrap service:', response.data);

        // استخراج المراجعات
        const reviews = response.data.Reviews ? response.data.Reviews.map(review => ({
            text: review.Text,
            rating: review.Ratting
        })) : [];

        // إرسال البيانات المستخرجة كاستجابة
        res.status(200).json({
            message: 'Data received and processed successfully',
            reviews
        });

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: error.message });
    }
}


// Route for welcomesaudi
router.post('/welcomesaudi',checkAuth, async (req, res) => {
    await processScraping('http://localhost:5000/scrap/welcomesaudi', req, res);
});

// Route for ebay/seller
router.post('/ebay/seller',checkAuth, async (req, res) => {
    await processScraping('http://localhost:5000/scrap/ebay/seller', req, res);
});

// Route for ebay/product
router.post('/ebay/proudect',checkAuth, async (req, res) => {
    await processScraping('http://localhost:5000/scrap/ebay/proudect', req, res);
});







module.exports = router;








// {
//     "id": "duh12",
//     "url": "https://welcomesaudi.com/ar/activity/masjid-shuhada-uhud-madinah"
// }
