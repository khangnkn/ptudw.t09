var db = require("../utils/db.util");

module.exports = {
    Add: comment => {
        return db.insert("comments", comment);
    }
};