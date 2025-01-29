const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetingsController');

router.get('/', meetingsController.getAllMeetings);
router.post('/', meetingsController.createMeeting);

module.exports = router;
