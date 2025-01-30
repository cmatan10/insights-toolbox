const express = require('express');
const router = express.Router();
const personalDetailsController = require('../controllers/personalDetailsController');

// GET personal details
router.get('/', personalDetailsController.getAllPersonalDetails);

// PUT personal details
router.put('/', personalDetailsController.updatePersonalDetails);

module.exports = router;
