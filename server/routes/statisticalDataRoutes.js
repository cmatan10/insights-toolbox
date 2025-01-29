const express = require('express');
const router = express.Router();
const statisticalDataController = require('../controllers/statisticalDataController');

router.get('/', statisticalDataController.getAllStatisticalData);
router.post('/', statisticalDataController.createStatisticalData);
router.get('/:id', statisticalDataController.getStatisticalDataById);
router.delete('/:id', statisticalDataController.deleteStatisticalData);

module.exports = router;
