const express = require('express');
const router = express.Router();
const UsageLog = require('../models/UsageLog');
const checkAuth = require('../middleware/authMiddleware');



router.get('/', checkAuth, async (req, res) => {
  try {
      // الحصول على معرف المستخدم من التوكن
      const userId = req.userData.id || req.userData.userId;

      // جلب العمليات الخاصة بالمستخدم فقط
      const logs = await UsageLog.find({ userId });

      // إرسال السجلات كاستجابة
      res.status(200).json(logs);
  } catch (error) {
      console.error('Error fetching user logs:', error);
      res.status(500).json({ error: 'Failed to fetch user logs' });
  }
});


module.exports = router;
