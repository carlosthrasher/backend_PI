// routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');

const { authenticateUser } = require('../helpers/authenticateUser');

router.get('/', authenticateUser, taskController.getTasks);
router.post('/', authenticateUser, taskController.createTask);
router.patch('/:id', authenticateUser, taskController.updateTask);
router.delete('/:id', authenticateUser, taskController.deleteTask);

module.exports = router