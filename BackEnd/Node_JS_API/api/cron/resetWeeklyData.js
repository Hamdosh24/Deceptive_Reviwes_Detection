const ScrapPredict = require('../models/ScrapPredict');
const Prediction = require('../models/Prediction');

const resetWeeklyDataIfNewWeek = async () => {
    try {
        const startOfWeek = new Date();
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

        const lastData = await ScrapPredict.findOne().sort({ createdAt: -1 });

        if (!lastData || new Date(lastData.createdAt).toDateString() !== startOfWeek.toDateString()) {
            await ScrapPredict.updateMany({}, { $set: { count: 0 } });
            await Prediction.updateMany({}, { $set: { count: 0 } });
            console.log('Weekly data has been reset.');
        }
    } catch (error) {
        console.error('Error occurred while resetting weekly data:', error);
    }
};

module.exports = { resetWeeklyDataIfNewWeek };
