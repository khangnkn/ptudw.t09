var db = require('../utils/db.util');

module.exports = {
    All: () => {
        var sql = `SELECT * from subcategories`
        return db.load(sql);
    },


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
        FROM articles 
        JOIN drafts ON articles.Draft = drafts.Id
        JOIN subcategories on drafts.Category = subcategories.Id
        GROUP BY (subcategories.Id)
        ORDER BY Articles DESC
        LIMIT 5`
        return db.load(sql)
    },
    listForAdmin: () => {
        return db.load(`
                        select subcategories.*,count(drafts.Id) as NofDr
                        from subcategories 
                        left join drafts on drafts.Category  = subcategories.Id
                        group by subcategories.Id
                        order by subcategories.Id asc`);
    },
    updateInfor: (id, name, cate) => {
        return db.load(`update subcategories set Name='${name}',Category=${cate} where Id = ${id}`);
    },

    top10Cat: () => {
        var sql = `SELECT subcategories.Id, subcategories.Name, COUNT(articles.Id) AS "Articles" 
        FROM articles JOIN drafts ON articles.Draft = drafts.Id
        JOIN subcategories on drafts.Category = subcategories.Id
        GROUP BY (subcategories.Id)
        ORDER BY Articles DESC
        LIMIT 10`
        return db.load(sql)
    }
    ,
    add: (name,Category) => {
        return db.load(`insert into subcategories values(default,${Category},'${name}')`);
    }
}