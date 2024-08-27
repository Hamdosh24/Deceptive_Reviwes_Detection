// services/scrapUsage.js
const ScrapResult = require('../models/ScrapResult');
const { resetWeeklyDataIfNewWeek } = require('../cron/resetWeeklyData');

const getWeeklyScrapUsage = async () => {
    try {
        await resetWeeklyDataIfNewWeek();

        const startOfWeek = new Date();
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 7);

        const usageByDay = await ScrapResult.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfWeek, $lt: endOfWeek }
                }
            },
            {
                $project: {
                    dayOfWeek: { $dayOfWeek: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$dayOfWeek",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        const dayNames = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];

        return usageByDay.map(day => ({
            day: dayNames[day._id - 1],
            count: day.count
        }));
    } catch (error) {
        console.error('Error occurred while getting weekly scrap usage:', error);
        throw new Error('Error retrieving scrap usage statistics');
    }
};

module.exports = { getWeeklyScrapUsage };
