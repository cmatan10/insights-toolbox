const CallHistory = require('../models/CallHistory');

exports.getAllCallHistories = async (req, res) => {
  try {
    const callHistories = await CallHistory.find();
    res.json(callHistories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCallHistory = async (req, res) => {
  const callHistory = new CallHistory({
    customerId: req.body.customerId,
    callDate: req.body.callDate,
    callDuration: req.body.callDuration,
    notes: req.body.notes
  });

  try {
    const newCallHistory = await callHistory.save();
    res.status(201).json(newCallHistory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getCallHistoryById = async (req, res) => {
  try {
    const callHistoryId = req.params.id;
    const callHistory = await CallHistory.findById(callHistoryId);
    if (!callHistory) {
      return res.status(404).json({ message: 'Call history not found' });
    }
    res.json(callHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCallHistory = async (req, res) => {
  try {
    const callHistoryId = req.params.id;
    const callHistory = await CallHistory.findById(callHistoryId);
    if (!callHistory) {
      return res.status(404).json({ message: 'Call history not found' });
    }
    await callHistory.remove();
    res.json({ message: 'Call history deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
