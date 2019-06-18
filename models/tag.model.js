var db = require('../utils/db.util');

module.exports = {
    all: () => {
        var sql = `select * from tags`;
        return db.load(sql);
    }
}