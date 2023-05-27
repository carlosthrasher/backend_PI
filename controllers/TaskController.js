// controllers/taskController.js

const Task = require('../models/Task');

module.exports = class Tasks { 
  static async getTasks(req, res) {
    const { userId } = req.user; // Assuming you have implemented user authentication middleware
  
    try {
      const tasks = await Task.find({ user: userId }).exec();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get tasks' });
    }
  }
  
  static async createTask(req, res) {
    const { userId } = req.user; // Assuming you have implemented user authentication middleware
    const { title, difficulty } = req.body;
  
    try {
      const task = await Task.create({ user: userId, title, difficulty });
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create task' });
    }
  }
  
  static async updateTask(req, res) {
    const { id } = req.params;
    const { title, difficulty } = req.body;
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(id, { title, difficulty }, { new: true }).exec();
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  }
  
  static async deleteTask(req, res) {
    const { id } = req.params;
  
    try {
      const deletedTask = await Task.findByIdAndDelete(id).exec();
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(deletedTask);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }
}
