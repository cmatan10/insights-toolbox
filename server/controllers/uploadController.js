const Upload = require('../../models/Upload');

exports.getAllUploads = async (req, res) => {
  try {
    const uploads = await Upload.find();
    res.json(uploads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUpload = async (req, res) => {
  const upload = new Upload({
    fileName: req.body.fileName,
    filePath: req.body.filePath,
    uploadDate: req.body.uploadDate
  });

  try {
    const newUpload = await upload.save();
    res.status(201).json(newUpload);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getUploadById = async (req, res) => {
  try {
    const uploadId = req.params.id;
    const upload = await Upload.findById(uploadId);
    if (!upload) {
      return res.status(404).json({ message: 'Upload not found' });
    }
    res.json(upload);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUpload = async (req, res) => {
  try {
    const uploadId = req.params.id;
    const upload = await Upload.findById(uploadId);
    if (!upload) {
      return res.status(404).json({ message: 'Upload not found' });
    }
    await upload.remove();
    res.json({ message: 'Upload deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
