
const Prediction = require('../models/Prediction'); 
const ScrapPredict = require('../models/ScrapPredict'); 
const getWeeklyUsage = async () => {
    const scrapUsage = await ScrapPredict.aggregate([
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

    const predictionUsage = await Prediction.aggregate([
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

    const combinedUsage = scrapUsage.concat(predictionUsage);

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

    return Object.keys(usageByDay).map(day => ({
        day: dayNames[parseInt(day) - 1], 
        count: usageByDay[day]
    }));
};



module.exports = { getWeeklyUsage };
