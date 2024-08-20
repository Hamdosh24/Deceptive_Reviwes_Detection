const express = require('express');
const router = express.Router();
const AdminUsageLog = require('../models/AdminUsageLog');
const checkAuth = require('../middleware/authMiddleware');
const checkAdmin = require('../middleware/check-admin');



// Route لجلب سجلات الاستخدام
router.get('/',  async (req, res) => {
  try {
      // تحقق من صلاحيات المستخدم

      await AdminlogUsage(userId, 'scraping Service', { url },time);

      // جلب جميع السجلات مع معلومات المستخدمين المرتبطة
      const logs = await AdminUsageLog.find()
          .populate('userId', 'firstName lastName email') // جلب بيانات المستخدم المرتبطة
          .exec();

      res.status(200).json(logs);
  } catch (error) {
      console.error('Error fetching usage logs:', error);
      res.status(500).json({ message: 'Failed to fetch usage logs' });
  }
});

module.exports = router;
