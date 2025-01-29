const express = require('express');
const router = express.Router();
const personalDetailsController = require('../controllers/personalDetailsController'); // Ensure this path is correct

router.get('/', personalDetailsController.getAllPersonalDetails);
router.post('/', personalDetailsController.createPersonalDetails);
router.get('/:id', personalDetailsController.getPersonalDetailsById);
router.delete('/:id', personalDetailsController.deletePersonalDetails);

module.exports = router;
