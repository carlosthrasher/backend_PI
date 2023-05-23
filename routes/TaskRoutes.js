const router = require('express').Router()

const TaskController = require('../controllers/TaskController')


const checkToken = require('../helpers/check-token')

router.post('/createTask', checkToken, TaskController.createTask)
router.patch('/update/:id', checkToken, TaskController.updateById)
router.delete('/delete/:id', checkToken, TaskController.deleteById)
router.get('/createSchedule/:id', checkToken, TaskController.createSchedule)

module.exports = router

