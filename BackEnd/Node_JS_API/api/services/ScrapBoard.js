const ScrapResult = require('../models/ScrapResult');  

const getWeeklyScrapUsage = async () => {
    try {
        const usageByDay = await ScrapResult.aggregate([
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
