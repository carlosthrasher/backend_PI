const mongoose = require('mongoose');

const availableTimeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('AvailableTime', availableTimeSchema);