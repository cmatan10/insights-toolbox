const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  title: String,
  date: Date,
  participants: [String]
});

module.exports = mongoose.model('Meeting', meetingSchema);
