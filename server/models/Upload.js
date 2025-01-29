const mongoose = require('mongoose');

const UploadSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Upload', UploadSchema);
