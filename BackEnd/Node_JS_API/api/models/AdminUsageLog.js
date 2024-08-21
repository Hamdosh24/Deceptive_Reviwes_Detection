const mongoose = require('mongoose');

const AdminusageLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  serviceUsed: { type: String, required: true },
  url: { type: String },
  text: { type: String  },  
  label: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const AdminUsageLog = mongoose.model('AdminUsageLog', AdminusageLogSchema);

module.exports = AdminUsageLog;


