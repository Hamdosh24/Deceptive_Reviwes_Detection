const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback'); // تأكد من مسار النموذج صحيح

router.post('/', async (req, res) => {
    const {  message, rating } = req.body;

    // التحقق من وجود القيم المطلوبة
    if ( !message || rating === undefined) {
        return res.status(400).json({ message: 'يرجى ملء جميع الحقول المطلوبة' });
    }

    // إنشاء feedback جديد
    const feedback = new Feedback({
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



module.exports = router;
