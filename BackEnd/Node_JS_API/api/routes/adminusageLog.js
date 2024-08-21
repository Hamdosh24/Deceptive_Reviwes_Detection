const express = require('express');
const router = express.Router();
const AdminUsageLog = require('../models/AdminUsageLog');
const checkAuth = require('../middleware/authMiddleware');
const checkAdmin = require('../middleware/check-admin');



router.get('/adminlogs', checkAuth,checkAdmin, async (req, res) => {
    try {

        if (req.userData.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const logs = await AdminUsageLog.find()
            .populate('userId', 'firstName lastName email') 
            .exec();

        res.status(200).json(logs);
    } catch (error) {
        console.error('Error fetching usage logs:', error);
        res.status(500).json({ message: 'Failed to fetch usage logs' });
    }
});

module.exports = router;
