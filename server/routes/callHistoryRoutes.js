const express = require('express');
const router = express.Router();
const callHistory = require('../data/callHistory');

// Get all call histories
router.get('/', (req, res) => {
  res.json(callHistory);
});

module.exports = router;
