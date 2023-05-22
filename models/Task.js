const mongoose = require("../db/conn");

// Define Mongoose schema for Task
const taskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: {type: String, required: true},
    difficulty: { type: String, enum: ['Fácil', 'Médio', 'Difícil'] },
    hours: Number
  });

  // Define Mongoose model for Task
const Task = mongoose.model('Task', taskSchema);

module.exports = Task