const express = require('express')
const user = express.Router()
const Controller = require('../controllers/user')

user.get('/:username/home', Controller.userPage)


module.exports = user