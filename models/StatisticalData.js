const mongoose = require('mongoose');

const StatisticalDataSchema = new mongoose.Schema({
  metric: { type: String, required: true },
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true }, // Added category field
  description: { type: String } // Added description field
});

module.exports = mongoose.model('StatisticalData', StatisticalDataSchema);
