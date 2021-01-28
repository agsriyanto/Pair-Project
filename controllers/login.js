const { Admin, User } = require('../models')
const { comparePass } = require('../helper/enkrip')

class Controller {
    static loginAdminForm(req, res) {
        res.render('login/loginAdminForm')
    }
    static loginAdmin(req, res) {
        const { username, password } = req.body
        const dataAdmin = { username, password }
        Admin.findOne({
            where: {
                username: dataAdmin.username
            }
        })
            .then(data => {
                if (comparePass(dataAdmin.password, data.password)) {
                    req.session.login = 'masuk'
                    res.redirect(`/admin/${dataAdmin.username}/home`)
                } else {
                    res.send('Salah password')
                }
            })
            .catch(err => {
                res.send(err)
            })
    }
    static logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/')
        })
    }

    static loginUserForm(req, res) {
        res.render('login/loginUserForm')
    }
    static loginUser(req, res) {
        const { username, password } = req.body
        const dataUser = { username, password }
        User.findOne({
            where: {
                username: dataUser.username
            }
        })
            .then(data => {
                if (comparePass(dataUser.password, data.password)) {
                    console.log('Masuk Create')
                    req.session.login = 'masuk'
                    res.redirect(`/user/${dataUser.username}/home`)
                } else {
                    res.send('Salah password')
                }
            })
            .catch(err => {
                res.send(err)
            })
    }
}
module.exports = Controller