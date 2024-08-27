const cron = require('node-cron');
const { resetWeeklyDataIfNewWeek } = require('../cron/resetWeeklyData');


// تشغيل وظيفة تصفير البيانات كل يوم اثنين عند منتصف الليل
cron.schedule('0 0 * * 1', async () => {
    console.log('Running weekly data reset job');
    await resetWeeklyDataIfNewWeek();
});
