module.exports = (req, res, next) => {
    console.log(req.session.login)
    if (req.session.login==='masuk') {
        res.send('tidak berhasil login')
    } else {
        next()
    }
}