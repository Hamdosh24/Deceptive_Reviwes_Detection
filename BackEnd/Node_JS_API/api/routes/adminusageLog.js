const express = require('express');
const router = express.Router();
const AdminUsageLog = require('../models/AdminUsageLog');
const checkAuth = require('../middleware/authMiddleware');
const checkAdmin = require('../middleware/check-admin');
const { getWeeklyUsage } = require('../services/predictionBoard');
const { getWeeklyScrapUsage } = require('../services/ScrapBoard'); 




router.get('/adminlogs', checkAuth,checkAdmin, async (req, res) => {
    try {


        const logs = await AdminUsageLog.find()
            .populate('userId', 'firstName lastName email') 
            .exec();

        res.status(200).json(logs);
    } catch (error) {
        console.error('Error fetching usage logs:', error);
        res.status(500).json({ message: 'Failed to fetch usage logs' });
    }
});

router.get('/predict-usage-stats',checkAuth,checkAdmin, async (req, res) => {
    try {
        const usageStats = await getWeeklyUsage();
        res.status(200).json(usageStats);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error retrieving usage statistics' });
    }
});

router.get('/scrap-usage-stats', checkAuth,checkAdmin, async (req, res) => {
    try {
        const usageStats = await getWeeklyScrapUsage();
        res.status(200).json(usageStats);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error retrieving scrap usage statistics' });
    }
});
module.exports = router;
