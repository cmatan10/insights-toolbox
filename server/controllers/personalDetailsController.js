const PersonalDetails = require('../models/PersonalDetails'); // Ensure this path is correct
const fs = require('fs');
const path = require('path');
const personalDetailsPath = path.join(__dirname, '../data/personalDetails.js');

exports.getAllPersonalDetails = async (req, res) => {
  try {
    const personalDetails = await PersonalDetails.find();
    res.json(personalDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePersonalDetails = (req, res) => {
  const newDetails = req.body;
  fs.writeFile(personalDetailsPath, `module.exports = ${JSON.stringify(newDetails, null, 2)};`, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update personal details' });
    }
    res.json({ message: 'Personal details updated successfully' });
  });
};

