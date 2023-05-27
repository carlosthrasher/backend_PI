// controllers/availableTimeController.js

const AvailableTime = require('../models/AvailableTime');

async function getUserAvailableTime(req, res) {
  const { userId } = req.user; // Assuming you have implemented user authentication middleware

  try {
    const availableTimes = await AvailableTime.find({ user: userId }).exec();
    res.json(availableTimes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get available time' });
  }
}

async function createAvailableTime(req, res) {
  const { userId } = req.user; // Assuming you have implemented user authentication middleware
  const { day, time } = req.body;

  try {
    const availableTime = await AvailableTime.create({ user: userId, day, time });
    res.json(availableTime);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create available time' });
  }
}

async function updateAvailableTime(req, res) {
  const { id } = req.params;
  const { day, time } = req.body;

  try {
    const updatedAvailableTime = await AvailableTime.findByIdAndUpdate(id, { day, time }, { new: true }).exec();
    if (!updatedAvailableTime) {
      return res.status(404).json({ error: 'Available time not found' });
    }
    res.json(updatedAvailableTime);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update available time' });
  }
}

async function deleteAvailableTime(req, res) {
  const { id } = req.params;

  try {
    const deletedAvailableTime = await AvailableTime.findByIdAndDelete(id).exec();
    if (!deletedAvailableTime) {
      return res.status(404).json({ error: 'Available time not found' });
    }
    res.json(deletedAvailableTime);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete available time' });
  }
}

module.exports = {
  getUserAvailableTime,
  createAvailableTime,
  updateAvailableTime,
  deleteAvailableTime,
};
