const express = require('express');
const router = express.Router();
const customerInquiriesController = require('../controllers/customerInquiriesController');

router.get('/', customerInquiriesController.getAllInquiries);
router.post('/', customerInquiriesController.createInquiry);
router.get('/:id', customerInquiriesController.getInquiryById);

module.exports = router;
