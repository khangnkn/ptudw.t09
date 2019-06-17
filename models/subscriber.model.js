var db = require('../utils/db.util');

module.exports = {
    singleByUserName: username => {
        sql = `SELECT Username, Password FROM Users WHERE Username = ${username} `
        return db.load(sql)
    },

    singleByEmail: email => {
        sql = `SELECT Id, Username, Password, Fullname, Email, DATE_FORMAT(Birthday, '%d/%m/%Y') as "Birthday" FROM users WHERE Email = "${email}" `
        console.log(sql);
        return db.load(sql)
    },

    update: obj => {
        return db.update("users", obj)
    }
}