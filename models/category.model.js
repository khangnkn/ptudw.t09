var db = require('../utils/db.util');

module.exports = {
    byCatId: id => {
        return db.load(`select Name from Categories where id = "${id}"`)
    }
}