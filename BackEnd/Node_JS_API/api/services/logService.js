const UsageLog = require('../models/UsageLog'); 

async function logUsageData(LogModel, userId, process,type, data) {

    try {
        if (Array.isArray(data)) {
            const logs = data.map(item => ({
                userId,
                process,
                type,
                url: item.url || null,
                text: item.text || null,
                createdAt: new Date()
            }));
            await LogModel.insertMany(logs); 
        } else {
            const log = {
                userId,
                process,
                type,
                url: data.url || null,
                text: data.text || null,
                createdAt: new Date()
            };
            await LogModel.create(log);
        }
  
        console.log('Usage logged successfully');
    } catch (error) {
        console.error('Failed to log usage:', error.message);
        throw error; 
    }
  }
async function logUsage(userId, process,type, data) {
    await logUsageData(UsageLog, userId, process,type, data);
}

module.exports = { logUsage };
