const StatisticalData = require('../models/StatisticalData');

exports.getAllStatisticalData = async (req, res) => {
  try {
    const statisticalData = await StatisticalData.find();
    res.json(statisticalData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createStatisticalData = async (req, res) => {
  const statisticalData = new StatisticalData({
    dataType: req.body.dataType,
    value: req.body.value,
    timestamp: req.body.timestamp
  });

  try {
    const newStatisticalData = await statisticalData.save();
    res.status(201).json(newStatisticalData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getStatisticalDataById = async (req, res) => {
  try {
    const statisticalDataId = req.params.id;
    const statisticalData = await StatisticalData.findById(statisticalDataId);
    if (!statisticalData) {
      return res.status(404).json({ message: 'Statistical data not found' });
    }
    res.json(statisticalData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteStatisticalData = async (req, res) => {
  try {
    const statisticalDataId = req.params.id;
    const statisticalData = await StatisticalData.findById(statisticalDataId);
    if (!statisticalData) {
      return res.status(404).json({ message: 'Statistical data not found' });
    }
    await statisticalData.remove();
    res.json({ message: 'Statistical data deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
