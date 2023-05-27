// models/GeneratedSchedule.js

const mongoose = require('mongoose');

const generatedScheduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  schedule: {
    Monday: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    }],
    Tuesday: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    }],
    Wednesday: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    }],
    Thursday: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    }],
    Friday: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    }],
  },
});

module.exports = mongoose.model('GeneratedSchedule', generatedScheduleSchema);

