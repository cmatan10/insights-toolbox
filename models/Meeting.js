const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // Added id field
  title: { type: String, required: true },
  time: { type: String, required: true }, // Added time field
  duration: { type: String, required: true }, // Added duration field
  date: { type: Date, required: true },
  participants: [{ type: String, required: true }]
});

module.exports = mongoose.model('Meeting', MeetingSchema);
