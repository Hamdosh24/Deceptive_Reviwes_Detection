const express = require('express');
const router = express.Router();
const UsageLog = require('../models/UsageLog');
const checkAuth = require('../middleware/authMiddleware');

// Route لجلب سجلات الاستخدام
router.get('/',checkAuth, async (req, res) => {
  try {
    // جلب جميع سجلات الاستخدام من قاعدة البيانات
    const logs = await UsageLog.find({});

    // إرسال السجلات كاستجابة
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching usage logs:', error);
    res.status(500).json({ error: 'Failed to fetch usage logs' });
  }
});

module.exports = router;
