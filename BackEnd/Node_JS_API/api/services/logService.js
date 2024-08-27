const UsageLog = require('../models/UsageLog'); 

async function logUsage(userId, serviceUsed, { url, text, label }) {
    try {
        const newLog = new UsageLog({
            userId,
            serviceUsed,
            url: url || null,  
            text,  
            label,
            createdAt: new Date()
        });
        await newLog.save(); 
        console.log('Usage logged successfully');
    } catch (error) {
        console.error('Failed to log usage:', error);
    }
}


module.exports = { logUsage };
