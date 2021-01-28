const { Admin, Task, User, TaskUser } = require('../models')
const nodemailer = require('nodemailer');
var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "c365ef06f72a20",
        pass: "48592be76296e2"
    }
})

class Controller {
    static adminPage(req, res) {
        const username = req.params.username
        Admin.findOne({
            include: [Task],
            where: {
                username: username
            }
        })
            .then(data => {
                res.render('admin/home', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static createTaskForm(req, res) {
        const username = req.params.username
        Admin.findOne({
            include: [{
                model: Task
            }],
            where: {
                username: username
            }
        })
            .then(data => {
                User.findAll()
                    .then(dataUser => {
                        res.render('admin/createTaskForm', { data, dataUser })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static createTask(req, res) {
        const username = req.params.username
        Admin.findOne({
            where: {
                username: username
            }
        })
            .then(data => {
                const { task_name } = req.body
                const dataTask = { task_name }
                dataTask.AdminId = data.id
                Task.create(dataTask)
                    .then(upload => {
                        Task.findOne({
                            where: {
                                task_name: dataTask.task_name
                            }
                        })
                            .then(dataTask => {
                                const { UserId } = req.body
                                const dataTaskUser = { UserId }
                                dataTaskUser.TaskId = dataTask.id
                                TaskUser.create(dataTaskUser)
                                    .then(yes => {
                                        User.findByPk(UserId)
                                            .then(dataUser => {
                                                //admintouser
                                                const messageAdmin = {
                                                    from: 'workmanagement@management.com',
                                                    to: data.email,
                                                    subject: `you ${username} already created work`,
                                                    text: `you already mentioned ${dataUser.username}`
                                                };
                                                transport.sendMail(messageAdmin, function (err, info) {
                                                    if (err) {
                                                        console.log(err)
                                                    } else {
                                                        console.log(info);
                                                    }
                                                });
                                                //usertoadmin
                                                const messageUser = {
                                                    from: 'workmanagement@management.com',
                                                    to: dataUser.email,
                                                    subject: `you ${dataUser.username} already mentioned for a work`,
                                                    text: `you mentioned by ${data.username}`
                                                };
                                                transport.sendMail(messageUser, function (err, info) {
                                                    if (err) {
                                                        console.log(err)
                                                    } else {
                                                        console.log(info);
                                                    }
                                                });
                                                res.redirect(`/admin/${username}/home`)
                                            })
                                            .catch(err => {
                                                res.send(err)
                                            })
                                    })
                                    .catch(err => {
                                        res.send(err)
                                    })
                            })
                            .catch(err => {
                                res.send(err)
                            })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            })
    }
    static seeTask(req, res) {
        const id = req.params.id
        const option = {
            include: [User]
        }
        Task.findByPk(id, option)
            .then(data => {
                Admin.findByPk(data.AdminId)
                    .then(dataAdmin => {
                        res.render('admin/task', { data, dataAdmin })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static addUserToTaskForm(req, res) {
        const id = req.params.id
        const option = {
            include: [User]
        }
        Task.findByPk(id, option)
            .then(dataTask => {
                Admin.findByPk(dataTask.AdminId)
                    .then(dataAdmin => {
                        User.findAll()
                            .then(dataUser => {
                                res.render('admin/addUserToTask', { dataTask, dataAdmin, dataUser })
                            })
                            .catch(err => {
                                res.send(err)
                            })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static addUserToTask(req, res) {
        const { UserId } = req.body
        const dataTaskUser = { UserId }
        const taskname = req.params.taskname
        console.log(taskname)
        Task.findOne({
            where: {
                task_name: taskname
            },
            include: [Admin]
        })
            .then(dataTask => {
                console.log(JSON.stringify(dataTask, null, 2))
                dataTaskUser.TaskId = dataTask.id
                TaskUser.create(dataTaskUser)
                    .then(data => {
                        User.findByPk(dataTaskUser.UserId)
                            .then(dataUser => {
                                const messageUser = {
                                    from: 'workmanagement@management.com',
                                    to: dataUser.email,
                                    subject: `you ${dataUser.username} already mentioned for a work`,
                                    text: `you mentioned by ${dataTask.Admin.username}`
                                };
                                transport.sendMail(messageUser, function (err, info) {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log(info);
                                    }
                                });
                                res.redirect(`/admin/${dataTask.id}/addUserToTask`)
                            })
                            .catch(err => {
                                res.send(err)
                            })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static deleteTask(req, res) {
        const id = req.params.id
        const username = req.params.username
        let user
        let UsersId = []
        Task.findOne({
            where: {
                id: id
            },
            include: [User]
        })
            .then(dataTask => {
                user = dataTask.Users
                return user
            })
            .then(dataUser => {
                for (let i of dataUser) {
                    UsersId.push(i.id)
                }
                return UsersId
            })
            .then(dataUsersId => {
                TaskUser.destroy({
                    where: {
                        id: dataUsersId
                    }
                })
                    .then(output => {
                        Task.destroy({
                            where: {
                                id: id
                            }
                        })
                            .then(output => {
                                res.redirect(`/admin/${username}/home`)
                            })
                            .catch(err => {
                                res.send(err)
                            })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static editTaskNameForm(req, res) {
        const id = req.params.id
        const option = {
            include: [Admin]
        }
        Task.findByPk(id, option)
            .then(data => {
                res.render('admin/editTaskName', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static editTaskName(req, res) {
        const id = req.params.id
        const username = req.params.username
        const { task_name } = req.body
        const data = { task_name }
        Task.update({
            task_name: data.task_name,
        }, {
            where: {
                id: id
            }
        })
            .then(sukses => {
                res.redirect(`/admin/${username}/home`)
            })
            .catch(err => {
                res.send(err)
            })
    }
}
module.exports = Controller