var db = require('../utils/db.util');

module.exports = {
    add: obj => {
        return db.insert("rejectdrafts", obj);
    }
}