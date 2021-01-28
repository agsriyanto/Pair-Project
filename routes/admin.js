const express = require('express')
const admin = express.Router()
const Controller = require('../controllers/admin')

admin.get('/:username/home', Controller.adminPage)
admin.get('/:username/createTask', Controller.createTaskForm)
admin.post('/:username/createTask', Controller.createTask)

admin.get('/:id/task', Controller.seeTask)
admin.get('/:id/addUserToTask', Controller.addUserToTaskForm)
admin.post('/:id/addUserToTask/:taskname', Controller.addUserToTask)
admin.get('/:id/deleteTask/:username', Controller.deleteTask)
admin.get('/:id/edit', Controller.editTaskNameForm)
admin.post('/:id/edit/:username', Controller.editTaskName)

module.exports = admin