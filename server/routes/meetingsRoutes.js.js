const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetingsController');

router.get('/meetings', meetingsController.getAllMeetings);
router.post('/meetings', meetingsController.createMeeting);
router.get('/meetings/:id', meetingsController.getMeetingById);

module.exports = router;
