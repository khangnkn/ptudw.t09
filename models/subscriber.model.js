var db = require('../utils/db.util');

module.exports = {
    singleByUserName: username => {
        sql = `SELECT Username, Password FROM Users WHERE Username = ${username} `
        return db.load(sql)
    },

    singleByEmail: email => {
        sql = `SELECT users.Id, Username, Password, Fullname, Email, DATE_FORMAT(Birthday, '%d/%m/%Y') as "Birthday", subcribers.Premium FROM users LEFT JOIN subcribers ON users.Id = subcribers.Id WHERE users.Email = "${email}" `
        return db.load(sql)
    },

    update: obj => {
        return db.update("users", obj)
    },

    addSub: (id, days) => {
        var object = {
            Id: id,
            Premium: days,
        }
        return db.insert("subcribers", object)
    }
}