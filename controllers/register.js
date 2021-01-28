const { Admin, User } = require('../models')

class Controller {
    static registerAdminForm(req, res) {
        res.render('register/registerAdminForm')
    }
    static registerAdmin(req, res) {
        const { name, username, password, email } = req.body
        const data = { name, username, password, email }
        Admin.create(data)
            .then(data => {
                res.redirect(`/admin/${data.username}/home`)
            })
            .catch(err => {
                res.send(err)
            })
    }


    static registerUserForm(req, res) {
        res.render('register/registerUserForm')
    }
    static registerUser(req, res) {
        console.log(req.body)
        const { name, username, password, email } = req.body
        const data = { name, username, password, email }
        User.create(data)
            .then(data => {
                res.redirect(`/user/${data.username}/home`)
            })
            .catch(err => {
                res.send(err)
            })
    }
}
module.exports = Controller