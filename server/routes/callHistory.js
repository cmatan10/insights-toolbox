const express = require('express');
const router = express.Router();
const callHistoryController = require('../controllers/callHistoryController');

router.get('/', callHistoryController.getAllCalls);
router.post('/', callHistoryController.createCall);

module.exports = router;
