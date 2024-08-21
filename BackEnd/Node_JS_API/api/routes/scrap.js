const express = require('express');
const router = express.Router();
const axios = require('axios');
const ScrapResult = require('../models/ScrapResult'); 
const { logUsage } = require('../services/logService'); 
const { AdminlogUsage } = require('../services/AdminlogService'); 
const checkAuth = require('../middleware/authMiddleware');




async function processScraping(scrapUrl, req, res) {
    try {
        const userId = req.userData.id || req.userData.userId; 
        const { id, url } = req.body;
        const time= Date.now

      
        await AdminlogUsage(userId, 'scraping Service', { url },time);
        await logUsage(userId, 'scraping Service', { url },time);



          
        await ScrapResult.create({ id, url });

         
        const response = await axios.post(scrapUrl, { id, url });

         
        console.log('Response from scrap service:', response.data);

         
        const reviews = response.data.Reviews ? response.data.Reviews.map(review => ({
            text: review.Text,
            rating: review.Ratting
        })) : [];

         
        res.status(200).json({
            message: 'Data received and processed successfully',
            reviews
        });

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: error.message });
    }
}


  
router.post('/welcomesaudi',checkAuth, async (req, res) => {
    await processScraping('http://localhost:5000/scrap/welcomesaudi', req, res);
});

router.post('/ebay/seller',checkAuth, async (req, res) => {
    await processScraping('http://localhost:5000/scrap/ebay/seller', req, res);
});

router.post('/ebay/proudect',checkAuth, async (req, res) => {
    await processScraping('http://localhost:5000/scrap/ebay/proudect', req, res);
});







module.exports = router;








// {
//     "id": "duh12",
//     "url": "https://welcomesaudi.com/ar/activity/masjid-shuhada-uhud-madinah"
// }
