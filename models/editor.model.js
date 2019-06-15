var db = require('../utils/db.util');

module.exports = {
    byId: id => {
        var sql = `select * from editors where Id = "${id}"`
        return db.load(sql)
    }
}