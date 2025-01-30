const express = require('express');
const router = express.Router();
const personalDetails = require('../data/personalDetails');

// GET personal details
router.get('/', (req, res) => {
  res.json(personalDetails);
});

module.exports = router;
