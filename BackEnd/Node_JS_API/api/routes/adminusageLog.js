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

async function getPostRequestsPerDayForAllUsers() {
    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // بداية الأسبوع (الأحد)
  
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7); // نهاية الأسبوع (السبت)
  
    const result = await AdminUsageLog.aggregate([
        {
            $match: {
                method: 'POST',
                timestamp: { $gte: startOfWeek, $lt: endOfWeek }
            }
        },
        {
            $group: {
                _id: { userId: '$userId', dayOfWeek: { $dayOfWeek: '$timestamp' } },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { '_id.userId': 1, '_id.dayOfWeek': 1 }
        }
    ]);
  
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const userPostCounts = {};
  
    result.forEach(({ _id, count }) => {
        const { userId, dayOfWeek } = _id;
        if (!userPostCounts[userId]) {
            userPostCounts[userId] = Array(7).fill(0);
        }
        userPostCounts[userId][dayOfWeek - 1] = count; // MongoDB تعيد الأيام من 1 (الأحد) إلى 7 (السبت)
    });
  
    return Object.entries(userPostCounts).map(([userId, counts]) => ({
        userId,
        postCounts: counts.map((count, index) => ({
            day: daysOfWeek[index],
            count
        }))
    }));
  }
  
  // استخدام الدالة
  getPostRequestsPerDayForAllUsers()
    .then(result => {
        console.log('Post requests per day for all users:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  

    router.get('/post-count-all', async (req, res) => {
        try {
            const result = await getPostRequestsPerDayForAllUsers();
            res.status(200).json(result);
        } catch (error) {
            console.error('Error occurred:', error);
            res.status(500).json({ error: error.message });
        }
    });


module.exports = router;
