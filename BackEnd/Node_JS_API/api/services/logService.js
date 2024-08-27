const AdminUsageLog = require('../models/AdminUsageLog'); 
const UsageLog = require('../models/UsageLog'); 

async function logUsageData(LogModel, userId, serviceUsed, data) {
    if (!userId || !serviceUsed) {
        throw new Error('Required parameters (userId, serviceUsed) are missing');
    }

    try {
        if (Array.isArray(data)) {
            const logs = data.map(item => ({
                userId,
                serviceUsed,
                url: null,
                text: item.text || 'No text',
                label: item.label || 'No label',
                createdAt: new Date()
            }));
            await LogModel.insertMany(logs); 
        } else {
            const newLog = new LogModel({
                userId,
                serviceUsed,
                url: data.url || null,
                text: data.text || null,
                label: data.label || null,
                createdAt: new Date()
            });
            await newLog.save();
        }

        console.log('Usage logged successfully');
    } catch (error) {
        console.error('Failed to log usage:', error.message);
        throw error; // إعادة رمي الخطأ للتعامل معه في المستوى الأعلى إذا لزم الأمر
    }
}

async function AdminlogUsage(userId, serviceUsed, data) {
    await logUsageData(AdminUsageLog, userId, serviceUsed, data);
}

async function logUsage(userId, serviceUsed, data) {
    await logUsageData(UsageLog, userId, serviceUsed, data);
}

module.exports = { AdminlogUsage, logUsage };
