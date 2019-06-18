var db = require("../utils/db.util");

module.exports = {
    all: () => {
        return db.load(`select * from states`);
    }
}