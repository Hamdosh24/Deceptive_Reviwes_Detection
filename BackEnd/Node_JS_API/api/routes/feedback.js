const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/authMiddleware');
const Feedback = require('../models/Feedback');


router.post('/Send', checkAuth, async (req, res) => {
    const { message, rating } = req.body;

    if (!message || rating === undefined) {
        return res.status(400).json({ message: 'يرجى ملء جميع الحقول المطلوبة' });
    }

    const userId = req.userData.id || req.userData.userId;

  
    const feedback = new Feedback({
        userId,  // تخزين معرف المستخدم
        message,
        rating,
    });

    try {
        const savedFeedback = await feedback.save();
        res.status(201).json(savedFeedback);
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ أثناء حفظ التعليق', error });
    }
});
const User = require('../models/users'); // تأكد من أن نموذج المستخدم متوفر

// مسار لجلب جميع التعليقات مع معلومات المستخدمين المرتبطة
router.get('/feedbacks', checkAuth, async (req, res) => {
    try {
        const feedbacks = await Feedback.find()
            .populate('userId', 'firstName lastName email') // جلب بيانات المستخدم المرتبطة
            .exec();

        res.status(200).json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ message: 'Failed to fetch feedbacks' });
    }
});



module.exports = router;
