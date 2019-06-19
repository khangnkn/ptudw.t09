var db = require("../utils/db.util");

module.exports = {
    Add: comment => {
        return db.insert("comments", comment);
    },
    deleteByArticle: (atc) => {
        return db.load(`delete from comments where Article=${atc}`);
    }
 };