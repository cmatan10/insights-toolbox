const Upload = require('../../models/Upload');

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

