var db = require('../utils/db.util');

module.exports = {
    singleByUserName: username => {
        sql = `SELECT Username, Password FROM Users WHERE Username = ${username} `
        return db.load(sql)
    },

    singleByEmail: email => {
        sql = `SELECT * FROM users WHERE Email = "${email}" `
        console.log(sql);
        return db.load(sql)
    }
}