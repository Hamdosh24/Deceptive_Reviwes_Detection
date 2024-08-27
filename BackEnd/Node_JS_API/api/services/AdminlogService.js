const AdminUsageLog = require('../models/AdminUsageLog'); 

async function AdminlogUsage(userId, serviceUsed, { url, text, label }) {
    try {
        const newLog = new AdminUsageLog({
            userId,
            serviceUsed,
            url: url || null, 
            text: text , 
            label: label , 
            createdAt: new Date()
        });
        await newLog.save();
        console.log('Usage logged successfully');
    } catch (error) {
        console.error('Failed to log usage:', error);
    }
}

module.exports = { AdminlogUsage };
