const fs = require('fs');
const path = require('path');
const personalDetailsPath = path.join(__dirname, '../data/personalDetails.js');

exports.getAllPersonalDetails = (req, res) => {
  fs.readFile(personalDetailsPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read personal details' });
    }
    const personalDetails = eval(data); // Convert module.exports to JSON
    res.json(personalDetails);
  });
};

exports.updatePersonalDetails = (req, res) => {
  const newDetails = [req.body]; // Wrap in an array to match the existing structure
  fs.writeFile(personalDetailsPath, `module.exports = ${JSON.stringify(newDetails, null, 2)};`, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update personal details' });
    }
    res.json({ message: 'Personal details updated successfully' });
  });
};

