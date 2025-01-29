const Meeting = require('../models/Meeting'); // Ensure this path is correct

exports.getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMeeting = async (req, res) => {
  const meeting = new Meeting({
    id: req.body.id,
    title: req.body.title,
    time: req.body.time,
    duration: req.body.duration,
    date: req.body.date,
    participants: req.body.participants
  });

  try {
    const newMeeting = await meeting.save();
    res.status(201).json(newMeeting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
