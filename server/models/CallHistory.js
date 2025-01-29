const mongoose = require('mongoose');

const CallHistorySchema = new mongoose.Schema({
  username: { type: String, required: true }, // Added username field
  Conversation: { type: String, required: true }, // Added call field
  status: { type: String, required: true }, // Added status field
  date: { type: Date, default: Date.now },
  duration: { type: Number, required: true } // duration in minutes
});

module.exports = mongoose.model('CallHistory', CallHistorySchema);
