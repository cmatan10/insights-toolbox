const customerInquiries = require('../data/customerInquiries');

const getAllInquiries = (req, res) => {
  res.json(customerInquiries);
};

const createInquiry = (req, res) => {
  const newInquiry = req.body;
  newInquiry.id = (customerInquiries.length + 1).toString();
  customerInquiries.push(newInquiry);
  res.status(201).json(newInquiry);
};

const getInquiryById = (req, res) => {
  const inquiry = customerInquiries.find((inq) => inq.id === req.params.id);
  if (inquiry) {
    res.json(inquiry);
  } else {
    res.status(404).json({ message: 'Inquiry not found' });
  }
};

module.exports = {
  getAllInquiries,
  createInquiry,
  getInquiryById,
};
