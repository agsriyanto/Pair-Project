const express = require('express')
const routes = express.Router()

const login = require('./login')
const register = require('./register')
const admin = require('./admin')
const user = require('./user')

routes.get('/', (req, res) => {
    res.render('home')
})

routes.use('/login', login)
routes.use('/register', register)
routes.use('/admin', admin)
routes.use('/user', user)


module.exports = routes