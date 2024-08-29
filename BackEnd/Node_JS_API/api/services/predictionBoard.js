const ScrapPredict = require('../models/ScrapPredict');
const Prediction = require('../models/Prediction');
const { resetWeeklyDataIfNewWeek } = require('../cron/resetWeeklyData');

const getWeeklyPredictUsage = async () => {
    try {
        await resetWeeklyDataIfNewWeek();

        // تحديد بداية ونهاية الأسبوع الحالي
        const startOfWeek = new Date();
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 7); 

        // جمع بيانات استخدام ScrapPredict
        const scrapUsage = await ScrapPredict.aggregate([
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
            }
        ]);

        // جمع بيانات استخدام Prediction
        const predictionUsage = await Prediction.aggregate([
            {
                $match: {
                    timestamp: { $gte: startOfWeek, $lt: endOfWeek }
                }
            },
            {
                $project: {
                    dayOfWeek: { $dayOfWeek: "$timestamp" }
                }
            },
            {
                $group: {
                    _id: "$dayOfWeek",
                    count: { $sum: 1 }
                }
            }
        ]);

        // دمج البيانات
        const combinedUsage = scrapUsage.concat(predictionUsage);

        // تجميع البيانات حسب اليوم
        const usageByDay = combinedUsage.reduce((acc, curr) => {
            if (!acc[curr._id]) {
                acc[curr._id] = 0;
            }
            acc[curr._id] += curr.count;
            return acc;
        }, {});

        const dayNames = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];

        // تحويل البيانات إلى الشكل المناسب
        return Object.keys(usageByDay).map(day => ({
            day: dayNames[parseInt(day) - 1],
            count: usageByDay[day]
        }));
    } catch (error) {
        console.error('Error occurred while getting weekly predict usage:', error);
        throw new Error('Error retrieving predict usage statistics');
    }
};

module.exports = { getWeeklyPredictUsage };