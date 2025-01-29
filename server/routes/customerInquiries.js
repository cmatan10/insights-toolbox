const express = require('express');
const router = express.Router();
const customerInquiries = require('../data/customerInquiries');

// Get all customer inquiries
router.get('/', (req, res) => {
  res.json(customerInquiries);
});

module.exports = router;
