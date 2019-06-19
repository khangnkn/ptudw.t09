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
        select tags.*,(select count(*) 
        from drafts_tags 
        where drafts_tags.idTag = tags.Id) as NofDr
        from tags`);
    },
    updateName: (id,name) => {
        return db.load(`update tags set Name='${name}' where Id = ${id}`);
    },
    add: name => {
        return db.load(`insert into tags values(default,'${name}')`);
    }
}