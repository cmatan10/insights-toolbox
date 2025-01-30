const express = require('express');
const router = express.Router();
const personalDetails = require('../data/personalDetails');
const personalDetailsController = require('../controllers/personalDetailsController');

// GET personal details
router.get('/', (req, res) => {
  res.json(personalDetails);
});

// PUT personal details
router.put('/', personalDetailsController.updatePersonalDetails);

module.exports = router;
