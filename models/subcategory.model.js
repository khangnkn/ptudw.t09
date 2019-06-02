var db = require('../utils/db.util');

module.exports = {
    byCatId: id => {
        var sql = `select Name from SubCategories where Category = "${id}"`
        console.log(sql);
        return db.load(`select Name from SubCategories where Category = "${id}"`)
    }
}