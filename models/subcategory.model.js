var db = require('../utils/db.util');

module.exports = {
    byCatId: id => {
        var sql = `select Name from SubCategories where Category = "${id}"`
        console.log(sql);
        return db.load(`select Name from SubCategories where Category = "${id}"`)
    },
    countArticlesBySingleCate: id => {
        var query = `SELECT COUNT(dr.Id) as Count
        FROM SubCategories scate
        INNER JOIN Drafts dr
        ON dr.Category = scate.Id and dr.State = 4
        WHERE scate.Id = ${id}`;
        return db.load(query);
    },

    countArticlesByCate: () => {
        var query = `SELECT scate.Id,COUNT(dr.Id) as Count
        FROM SubCategories scate
        INNER JOIN Drafts dr
        ON dr.Category = scate.Id and dr.State = 4
        GROUP BY scate.Id`;
        return db.load(query);
    },

    topNSCateByView: (n) => {
        var query = `SELECT scate.*,SUM(atc.Views) as TotalView,COUNT(atc.Id) as Total
                    FROM SubCategories scate
                    INNER JOIN Drafts dr
                    ON dr.Category = scate.Id and dr.State = 4
                    INNER JOIN Articles atc
                    ON dr.Id = atc.Draft
                    GROUP BY scate.Id
                    ORDER BY TotalView DESC
                    LIMIT ${n}`;

        return db.load(query);
    },
}