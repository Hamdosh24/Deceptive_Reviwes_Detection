const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/authMiddleware');
const checkAdmin = require('../middleware/check-admin');
const { getWeeklyPredictUsage } = require('../services/predictionBoard');
const { getWeeklyScrapUsage } = require('../services/ScrapBoard');
const { resetWeeklyDataIfNewWeek } = require('../cron/resetWeeklyData');
const UsageLog = require('../models/UsageLog');
const mongoose = require('mongoose');


router.get('/admin_usagelogs',checkAuth,checkAdmin ,async (req, res) => {
    try {
        const logs = await UsageLog.find()
            .populate({
                path: 'userId',
                select: 'firstName lastName email' 
            })
            .exec();
        
        res.status(200).json(logs);
    } catch (error) {
        console.error('Error fetching usage logs:', error);
        res.status(500).json({ message: 'Failed to fetch usage logs' });
    }
});


router.delete('/admin_usagelogs/:id',checkAuth,checkAdmin, async (req, res) => {
    const { id } = req.params; 
    if (!id) {
        return res.status(400).json({ message: 'يرجى توفير _id لحذف السجل' });
    }

    try {
  
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'الـ _id غير صحيح' });
        }

        const result = await UsageLog.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'لم يتم العثور على سجل الاستخدام باستخدام _id المحدد' });
        }

        res.status(200).json({ message: 'تم حذف سجل الاستخدام بنجاح', deletedId: result._id });
    } catch (error) {
        console.error('Error deleting usage log:', error);
        res.status(500).json({ message: 'حدث خطأ أثناء حذف سجل الاستخدام', error: error.message });
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
