const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/authMiddleware');
const checkAdmin = require('../middleware/check-admin');
const { getWeeklyPredictUsage } = require('../services/predictionBoard');
const { getWeeklyScrapUsage } = require('../services/ScrapBoard');
const { resetWeeklyDataIfNewWeek } = require('../cron/resetWeeklyData');
const AdminUsageLog = require('../models/AdminUsageLog');





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

router.get('/predict-usage-stats', checkAuth, checkAdmin, async (req, res) => {
    try {
        await resetWeeklyDataIfNewWeek(); // تأكد من تصفير البيانات إذا لزم الأمر
        const weeklyPredictUsage = await getWeeklyPredictUsage();
        res.status(200).json(weeklyPredictUsage);
    } catch (error) {
        console.error('Error occurred while fetching weekly usage:', error);
        res.status(500).json({ error: 'Failed to fetch weekly usage' });
    }
})
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
