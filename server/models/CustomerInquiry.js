const mongoose = require('mongoose');

const CustomerInquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }, // Changed to string type
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CustomerInquiry', CustomerInquirySchema);
