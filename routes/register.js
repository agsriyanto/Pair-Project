const express = require('express')
const register = express.Router()
const Controller = require('../controllers/register')

register.get('/admin', Controller.registerAdminForm)
register.post('/admin', Controller.registerAdmin)
register.get('/user', Controller.registerUserForm)
register.post('/user', Controller.registerUser)

module.exports = register