const express = require('express');
const router = express.Router();
const axios = require('axios');
const ScrapResult = require('../models/ScrapResult'); 
const { AdminlogUsage, logUsage } = require('../services/logService');
const checkAuth = require('../middleware/authMiddleware');



async function processScraping(scrapUrl, req, res) {
    try {
        const userId = req.userData.id || req.userData.userId; 
        const { url } = req.body;  
        const time = Date.now();

    
        await AdminlogUsage(userId, 'scraping Service', { url }, time);
        await logUsage(userId, 'scraping Service', { url }, time);


        const scrapResult = new ScrapResult({ url });
        await scrapResult.save();

        const response = await axios.post(scrapUrl, { id: scrapResult._id, url });

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


  
router.post('/', checkAuth, async (req, res) => {
    const { url } = req.body;

    let scrapUrl;

    if (url.includes('welcomesaudi.com')) {
        scrapUrl = 'http://localhost:5000/scrap/welcomesaudi';
    } else if (url.includes('ebay.com/seller')) {
        scrapUrl = 'http://localhost:5000/scrap/ebay/seller';
    } else if (url.includes('ebay.com/proudect')) {
        scrapUrl = 'http://localhost:5000/scrap/ebay/proudect';
    }else if(url.includes('https://www.talabat.com/')){
        scrapUrl='http://localhost:5000/scrap/talabat';
    } else {
        return res.status(400).json({ error: 'Unsupported URL' });
    }

    await processScraping(scrapUrl, req, res);
});




module.exports = router;








// {
//     "url": "https://welcomesaudi.com/ar/activity/masjid-shuhada-uhud-madinah"
// }
