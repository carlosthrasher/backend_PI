// routes/availableTimeRoutes.js

const express = require('express');
const router = express.Router();
const availableTimeController = require('../controllers/AvailableTimeController');

const { authenticateUser } = require('../helpers/authenticateUser');


router.get('/',authenticateUser, availableTimeController.getUserAvailableTime);
router.post('/',authenticateUser, availableTimeController.createAvailableTime);
router.put('/:id',authenticateUser, availableTimeController.updateAvailableTime);
router.delete('/:id',authenticateUser, availableTimeController.deleteAvailableTime);

module.exports = router;
