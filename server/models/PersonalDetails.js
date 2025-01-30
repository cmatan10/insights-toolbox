const mongoose = require('mongoose');

const PersonalDetailsSchema = new mongoose.Schema({
  profileImage: { type: String },
  username: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  companyName: { type: String, required: true },
  businessEmail: { type: String, required: true },
  businessPhone: { type: String, required: true },
  companyDescription: { type: String },
  linkedin: { type: String },
  instagram: { type: String },
  facebook: { type: String },
  twitter: { type: String }
});

module.exports = mongoose.model('PersonalDetails', PersonalDetailsSchema);
