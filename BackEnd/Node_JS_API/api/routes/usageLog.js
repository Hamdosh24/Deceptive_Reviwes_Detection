const express = require('express');
const router = express.Router();
const UsageLog = require('../models/UsageLog');
const checkAuth = require('../middleware/authMiddleware');


router.get('/get_usagelogs', checkAuth, async (req, res) => {
    try {
        const userId = req.userData.id || req.userData.userId;

        if (!userId) {
            return res.status(400).json({ error: 'User ID not found in the token' });
        }

        const logs = await UsageLog.find({ userId }).exec();

        if (!logs || logs.length === 0) {
            return res.status(404).json({ message: 'No logs found for this user' });
        }

        res.status(200).json({ logs });
    } catch (error) {
        console.error('Error fetching user logs:', error.message);
        res.status(500).json({ error: 'Failed to fetch user logs', details: error.message });
    }
});




module.exports = router;
