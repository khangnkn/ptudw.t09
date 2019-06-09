var db = require('../utils/db.util');

module.exports = {
    byId: id => {
        var sql = `select Name from SubCategories where Id = "${id}"`
        return db.load(sql)
    }
}