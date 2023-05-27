// routes/generatedScheduleRoutes.js

const express = require('express');
const router = express.Router();
const generatedScheduleController = require('../controllers/GenerateScheduleController');
const { authenticateUser } = require('../helpers/authenticateUser');

router.post('/', authenticateUser, generatedScheduleController.generateSchedule);

module.exports = router;
