const express = require('express');
const router = express.Router();
const callHistoryController = require('../controllers/callHistoryController');

router.get('/', callHistoryController.getAllCallHistories);
router.post('/', callHistoryController.createCallHistory);
router.get('/:id', callHistoryController.getCallHistoryById);
router.delete('/:id', callHistoryController.deleteCallHistory);

module.exports = router;
