const PersonalDetails = require('../models/PersonalDetails'); // Ensure this path is correct

exports.getAllPersonalDetails = async (req, res) => {
  try {
    const personalDetails = await PersonalDetails.find();
    res.json(personalDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPersonalDetails = async (req, res) => {
  const personalDetails = new PersonalDetails({
    name: req.body.name,
    age: req.body.age,
    address: req.body.address
  });

  try {
    const newPersonalDetails = await personalDetails.save();
    res.status(201).json(newPersonalDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getPersonalDetailsById = async (req, res) => {
  try {
    const personalDetailsId = req.params.id;
    const personalDetails = await PersonalDetails.findById(personalDetailsId);
    if (!personalDetails) {
      return res.status(404).json({ message: 'Personal details not found' });
    }
    res.json(personalDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePersonalDetails = async (req, res) => {
  try {
    const personalDetailsId = req.params.id;
    const personalDetails = await PersonalDetails.findById(personalDetailsId);
    if (!personalDetails) {
      return res.status(404).json({ message: 'Personal details not found' });
    }
    await personalDetails.remove();
    res.json({ message: 'Personal details deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
