const router = require('express').Router()

const TaskController = require('../controllers/TaskController')


const authenticateToken = require('../helpers/authenticate-token')

router.post('/createTask', authenticateToken, TaskController.createTask)
router.patch('/update/:id', authenticateToken, TaskController.updateById)
router.delete('/delete/:id', authenticateToken, TaskController.deleteById)
router.get('/createSchedule/:id', authenticateToken, TaskController.createSchedule)

module.exports = router

