var bcrypt = require('bcryptjs');
function enkrip(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash
}
function comparePass(plainPassword, passwordDB) {
    return bcrypt.compareSync(plainPassword, passwordDB);
}
module.exports = { enkrip, comparePass }