var db = require('../utils/db.util');

module.exports = {
    byId: id => {
        var sql = `select Name from subcategories where Id = "${id}"`
        return db.load(sql)
    },

    byCat: CatID => {
        var sql = `SELECT * FROM subcategories WHERE Category = ${CatID}`;
        return db.load(sql);
    },

    top5Cat: () => {
        var sql = `SELECT subcategories.Id, subcategories.Name, COUNT(articles.Id) AS "Articles" 
        FROM articles JOIN drafts ON articles.Draft = drafts.Id
        JOIN subcategories on drafts.Category = subcategories.Id
        GROUP BY (subcategories.Id)
        ORDER BY Articles DESC
        LIMIT 5`
        return db.load(sql)
    }
}