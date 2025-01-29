const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

router.get('/', uploadController.getAllUploads);
router.post('/', uploadController.createUpload);
router.get('/:id', uploadController.getUploadById);
router.delete('/:id', uploadController.deleteUpload);

module.exports = router;
