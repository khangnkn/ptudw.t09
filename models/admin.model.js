var db = require('../utils/db.util');

module.exports = {
    byId: id => {
        var sql = `select * from admins where Id = "${id}"`;
        return db.load(sql)
    },
    byUsername: str => {
        var sql = `select * from admins where username like '${str}'`;
        return db.load(sql)
    }
}