const express = require('express');
const router = express.Router();
const personalDetailsController = require('../controllers/personalDetailsController');

// GET personal details
router.get('/', personalDetailsController.getAllPersonalDetails);

// POST personal details
router.post('/', personalDetailsController.updatePersonalDetails);

module.exports = router;
