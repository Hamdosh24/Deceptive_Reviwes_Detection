const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/authMiddleware');
const checkAdmin = require('../middleware/check-admin');
const Feedback = require('../models/Feedback');

router.post('/send_feedback', checkAuth, async (req, res) => {
    const { message } = req.body;

    if (!message=== undefined) {
        return res.status(400).json({ message: 'يرجى ملء جميع الحقول المطلوبة' });
    }

    const userId = req.userData.id || req.userData.userId;


    const feedback = new Feedback({
        userId, 
        message,
    });

    try {
        const savedFeedback = await feedback.save();
        res.status(201).json({ message: 'تم إرسال التعليق بنجاح', feedback: savedFeedback });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ message: 'حدث خطأ أثناء حفظ التعليق', error: error.message });
    }
});



router.get('/get_feedbacks', checkAuth, async (req, res) => {
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

router.delete('/delete_feedback', checkAuth,checkAdmin, async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ message: 'يرجى توفير النص لحذف التعليق' });
    }

    try {
        const deletedFeedback = await Feedback.findOneAndDelete({ message });

        if (!deletedFeedback) {
            return res.status(404).json({ message: 'التعليق غير موجود' });
        }

        res.status(200).json({ message: 'تم حذف التعليق بنجاح', feedback: deletedFeedback });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ message: 'حدث خطأ أثناء حذف التعليق', error: error.message });
    }
});


module.exports = router;
