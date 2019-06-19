var db = require("../utils/db.util");

module.exports = {
    deleteByDraft: draft => {
        return db.load(`delete from drafts_tags where idDraft = ${draft}`);
    }
}