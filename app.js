const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes/index')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.use(express.static(__dirname + '/views'))

app.use(router)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})