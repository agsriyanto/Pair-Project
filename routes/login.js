const express = require('express')
const login = express.Router()
const Controller = require('../controllers/login')
const authentication = require('../middleware/authentication')

login.get('/admin', Controller.loginAdminForm)
login.post('/admin', authentication, Controller.loginAdmin)
login.get('/user', Controller.loginUserForm)
login.post('/user', authentication, Controller.loginUser)
login.get('/logout', Controller.logout)


module.exports = login