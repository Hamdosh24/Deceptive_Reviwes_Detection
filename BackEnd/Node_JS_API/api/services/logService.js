const UsageLog = require('../models/UsageLog'); // تأكد من مسار الملف الصحيح

async function logUsage(userId, serviceUsed, { url, text, label }) {
    try {
        const newLog = new UsageLog({
            userId,
            serviceUsed,
            url: url || null,  // إذا لم يكن هناك url، استخدم null
            text,  // إذا لم يكن هناك text، استخدم null
            label, // إذا لم يكن هناك label، استخدم null
            createdAt: new Date()
        });
        await newLog.save(); // حفظ السجل في قاعدة البيانات
        console.log('Usage logged successfully');
    } catch (error) {
        console.error('Failed to log usage:', error);
    }
}


module.exports = { logUsage };
