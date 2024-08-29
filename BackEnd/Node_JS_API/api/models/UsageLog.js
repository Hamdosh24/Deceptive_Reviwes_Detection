const mongoose = require('mongoose');

const usageLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  process: { type: String, required: true },
  type: { type: String, required: true },
  url: { type: String },
  text: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const UsageLog = mongoose.model('UsageLog', usageLogSchema);

module.exports = UsageLog;
