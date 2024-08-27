const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/authMiddleware');
const checkAdmin = require('../middleware/check-admin');
const Feedback = require('../models/Feedback');

router.post('/send', checkAuth, async (req, res) => {
    const { message, rating } = req.body;

    if (!message || rating === undefined) {
        return res.status(400).json({ message: 'يرجى ملء جميع الحقول المطلوبة' });
    }

    const userId = req.userData.id || req.userData.userId;

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'التقييم يجب أن يكون بين 1 و 5' });
    }

    const feedback = new Feedback({
        userId, 
        message,
        rating,
    });

    try {
        const savedFeedback = await feedback.save();
        res.status(201).json({ message: 'تم إرسال التعليق بنجاح', feedback: savedFeedback });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ message: 'حدث خطأ أثناء حفظ التعليق', error: error.message });
    }
});



router.get('/feedbacks', checkAuth,checkAdmin, async (req, res) => {
    try {
        const feedbacks = await Feedback.find()
            .populate('userId', 'firstName lastName email') 
            .exec();

        res.status(200).json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ message: 'Failed to fetch feedbacks' });
    }
});



module.exports = router;
