const CustomerInquiry = require('../../models/CustomerInquiry');

exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await CustomerInquiry.find();
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getInquiryById = async (req, res) => {
  try {
    const inquiryId = req.params.id;
    const inquiry = await CustomerInquiry.findById(inquiryId);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.json(inquiry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createInquiry = async (req, res) => {
  const inquiry = new CustomerInquiry({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message
  });

  try {
    const newInquiry = await inquiry.save();
    res.status(201).json(newInquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
