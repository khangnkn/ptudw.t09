var db = require("../utils/db.util");

module.exports = {
    listByDraft: (id) => {
        return db.load(`
        select tags.Id,tags.Name
        from drafts_tags
        inner join tags
        where drafts_tags.idTag = ${id}
        order by tags.Id ASC
        limit 10
        `);
    },
    listForAdminWC: () => {
        return db.load(`
        select tags.*,count(drafts_tags.Id) as NofDraft
        from tags
        inner join drafts_tags
        on drafts_tags.idTag = tags.Id
        group by tags.Id`);
    }
}