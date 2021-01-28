const { User, Task } = require('../models')
const user = require('../routes/user')

class Controller {
    static userPage(req, res) {
        const username = req.params.username
        User.findOne({
            include:[Task],
            where: {
                username: username
            }
        })
            .then(data => {
                res.render('user/home', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }

}
module.exports = Controller