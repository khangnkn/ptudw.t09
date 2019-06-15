var db = require('../utils/db.util');

module.exports = {
    singleByID: id =>{
        var query = `SELECT * FROM Tags t WHERE t.Id = id`;
        return db.load(query);
    },
    countArticlesBySingleTag: id => {
        var query = `SELECT COUNT(dt.Id) as Count
        FROM Tags tag,Drafts_Tags dt
        INNER JOIN Drafts dr
        ON dr.Id = dt.IdDraft and dr.State = 4
        WHERE tag.Id = dt.idTag and tag.Id = ${id}`;
        return db.load(query);
    },

    getTopNTagByView: n => {
        var query = `SELECT tag.*,COUNT(dt.Id) as Count
        FROM Tags tag,Drafts_Tags dt
        INNER JOIN Drafts dr
        ON dr.Id = dt.IdDraft and dr.State = 4
        WHERE tag.Id = dt.idTag
        GROUP BY tag.Id
        ORDER BY Count DESC
        LIMIT ${n}`;
        return db.load(query);
    },
}