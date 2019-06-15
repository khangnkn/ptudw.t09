var db = require('../utils/db.util');

module.exports = {
    // Get top 4 articles of week
    getTop4ArticlesOfWeek: (date) => {
        var sql = `SELECT atc.*,dr.*,scate.*,wr.Alias,DATE_FORMAT(atc.PublishTime, "%d-%c-%Y") as PublishDate
        FROM Articles atc
        INNER JOIN Drafts dr
        ON dr.Id = atc.Draft and dr.State = 4
        INNER JOIN Writers wr
        ON wr.Id = dr.Author
        INNER JOIN SubCategories scate
        ON dr.Category = scate.Id
        WHERE DATEDIFF('${date}',atc.PublishTime) < 8
        ORDER BY atc.Views DESC 
        LIMIT 4`;
        return db.load(sql);
    },

    // Get top 10 most views
    getTop10ArticlesMostViews: (date) => {
        var query = `SELECT atc.*,dr.*,scate.*,wr.Alias,DATE_FORMAT(atc.PublishTime, "%d-%c-%Y") as PublishDate
                    FROM Articles atc
                    INNER JOIN Drafts dr
                    ON dr.Id = atc.Draft and dr.State = 4
                    INNER JOIN Writers wr
                    ON wr.Id = dr.Author
                    INNER JOIN SubCategories scate
                    ON dr.Category = scate.Id
                    WHERE atc.PublishTime < STR_TO_DATE('${date}', '%Y-%m-%d %H:%i:%s')
                    ORDER BY atc.Views DESC 
                    LIMIT 10`;
        return db.load(query);
    },

    // Get top 10 newest
    getTop10ArticlesNewest: (date) => {
        var query = `SELECT atc.*,dr.*,scate.*,wr.Alias,DATE_FORMAT(atc.PublishTime, "%d-%c-%Y") as PublishDate
                    FROM Articles atc
                    INNER JOIN Drafts dr
                    ON dr.Id = atc.Draft and dr.State = 4
                    INNER JOIN Writers wr
                    ON wr.Id = dr.Author
                    INNER JOIN SubCategories scate
                    ON dr.Category = scate.Id
                    WHERE atc.PublishTime < STR_TO_DATE('${date}', '%Y-%m-%d %H:%i:%s')
                    ORDER BY atc.PublishTime DESC 
                    LIMIT 10`;
        return db.load(query);
    },

    // Get top 5 articles by subcategory
    getTop5ArticlesBySCategory: (cate,date) => {
        var query = `SELECT atc.*,dr.*,wr.Alias,DATE_FORMAT(atc.PublishTime, "%d-%c-%Y") as PublishDate
        FROM Articles atc
        INNER JOIN Drafts dr
        ON dr.Id = atc.Draft and dr.State = 4 and dr.Category = ${cate}
        INNER JOIN Writers wr
        ON wr.Id = dr.Author
        WHERE atc.PublishTime < STR_TO_DATE('${date}', '%Y-%m-%d %H:%i:%s')
        ORDER BY atc.Views DESC 
        LIMIT 5`;
        return db.load(query);
    },

    // Get articles by subcatgory (use for subcategory by search)
    getArticlesBySubCategory: (subCate,date) => {
        var query = `SELECT atc.*,dr.*,scate.Name as NameSubCate,DATE_FORMAT(atc.PublishTime, "%d-%c-%Y") as PublishDate,wr.Alias,COUNT(cm.Id) as TotalCmt
                    FROM Articles atc
                    INNER JOIN Drafts dr
                    ON atc.Draft = dr.Id and dr.State = 4 and dr.Category = ${subCate}
                    INNER JOIN Writers wr
                    ON wr.Id = dr.Author
                    INNER JOIN Comments cmt
                    ON cmt.Article = atc.Id
                    INNER JOIN SubCategories scate
                    ON dr.Category = scate.Id
                    WHERE atc.PublishTime < STR_TO_DATE('${date}', '%Y-%m-%d %H:%i:%s')
                    GROUP BY atc.Id
                    ORDER BY PublishDate DESC,atc.Premium DESC,atc.PublishTime DESC,atc.ID ASC
                    LIMIT 100`;
        return db.load(query);
    },

    // Get articles by tag (use for tag by search)
    getArticlesByTag: (tag,date) => {
        var query = `SELECT atc.*,dr.*,scate.Name as NameSubCate,DATE_FORMAT(atc.PublishTime, "%d-%c-%Y") as PublishDate,wr.Alias,COUNT(cm.Id) as TotalCmt
                    FROM Articles atc
                    INNER JOIN Drafts dr
                    ON atc.Draft = dr.Id and dr.State = 4
                    INNER JOIN Writers wr
                    ON wr.Id = dr.Author
                    INNER JOIN Comments cmt
                    ON cmt.Article = atc.Id
                    INNER JOIN Drafts_Tags dt
                    ON atc.Id = dt.idDraft and dt.idTag = ${tag}
                    INNER JOIN SubCategories scate
                    ON dr.Category = scate.Id
                    WHERE atc.PublishTime < STR_TO_DATE('${date}', '%Y-%m-%d %H:%i:%s')
                    GROUP BY atc.Id 
                    ORDER BY PublishDate DESC,atc.Premium DESC,atc.PublishTime DESC,atc.ID ASC
                    LIMIT 100`;
        return db.load(query);
    },

    // Get articles tag by subcatory
    getArticleTagBySubCategory: (subCate,date) => {
        var query =`SELECT dt.*,tag.Name
                    FROM Drafts_Tags dt
                    INNER JOIN Tags tag
                    ON dt.idTag = tag.Id
                    WHERE dt.idDraft in (SELECT atc.Draft
                                    FROM Articles atc
                                    INNER JOIN Drafts dr
                                    ON atc.Draft = dr.Id and dr.State = 4 and dr.Category = ${subCate}
                                    WHERE atc.PublishTime < STR_TO_DATE('${date}', '%Y-%m-%d %H:%i:%s')
                                    )
                    LIMIT 100`;
        return db.load(query);
    },

    // Get articles tag by tag
    getArticleTagByTag: (tag,date) => {
        var query =`SELECT dt.*,tag.Name
                    FROM Drafts_Tags dt
                    INNER JOIN Tags tag
                    ON dt.idTag = tag.Id
                    WHERE dt.idDraft IN (SELECT atc.Draft
                                            FROM Articles atc
                                            INNER JOIN Drafts dr
                                            ON atc.Draft = dr.Id and dr.State = 4
                                            INNER JOIN Drafts_Tags dt
                                            ON atc.Id = dt.idDraft and dt.idTag = ${tag}
                                            WHERE atc.PublishTime < STR_TO_DATE('${date}', '%Y-%m-%d %H:%i:%s')
                                            GROUP BY atc.Id 
                                            )
                    LIMIT 100`;
        return db.load(query);
    },
    getArticlesByKeyword: (keyword,date) => {
        var query = `SELECT atc.*,dr.*,scate.Name as NameSubCate,DATE_FORMAT(atc.PublishTime, "%d-%c-%Y") as PublishDate,wr.Alias,COUNT(cm.Id) as TotalCmt
                    FROM Articles atc
                    INNER JOIN Drafts dr
                    ON atc.Draft = dr.Id and dr.State = 4
                    INNER JOIN Writers wr
                    ON wr.Id = dr.Author
                    INNER JOIN Comments cmtORDER BY PublishDate DESC,atc.Premium DESC,atc.PublishTime DESC,atc.ID DESC
                    ON cmt.Article = atc.Id
                    INNER JOIN Drafts_Tags dt
                    ON atc.Id = dt.idDraft and dt.idTag = ${tag}
                    INNER JOIN SubCategories scate
                    ON dr.Category = scate.Id
                    WHERE atc.PublishTime < STR_TO_DATE('${date}', '%Y-%m-%d %H:%i:%s') and dr.Title like '%${keyword}%'
                    GROUP BY atc.Id 
                    ORDER BY PublishDate DESC,atc.Premium DESC,atc.PublishTime DESC,atc.ID ASC
                    LIMIT 100`;
        return db.load(query);
    },

    // Get articles tag by keyword
    getArticleTagByKeyword: (keyword,date) => {
        var query = `SELECT dt.*,tag.Name
                    FROM Drafts_Tags dt
                    INNER JOIN Tags tag
                    ON dt.idTag = tag.Id
                    WHERE dt.idDraft IN  (SELECT atc.Draft
                                        FROM Articles atc
                                        INNER JOIN Drafts dr
                                        ON atc.Draft = dr.Id and dr.State = 4 
                                        WHERE atc.PublishTime < STR_TO_DATE('${date}', '%Y-%m-%d %H:%i:%s') and dr.Title like '%${keyword}%'
                                        )
                    LIMIT 100`;
        return db.load(query);
    },

    // Top N most viewed for most viewed articles
    getTopNViewed: (date,n) => {
        var query = `SELECT atc.*,dr.*,COUNT(cmt.Id) as TotalCmt,DATE_FORMAT(atc.PublishTime, "%d-%c-%Y") as PublishDate,wr.Alias
                    FROM Articles atc
                    INNER JOIN Drafts dr
                    ON dr.Id = atc.Draft and dr.State = 4
                    INNER JOIN Writers wr
                    ON wr.Id = dr.Author
                    INNER JOIN Comments cmt
                    ON cmt.Id = atc.Draft
                    WHERE atc.PublishTime < STR_TO_DATE('${date}', '%Y-%m-%d %H:%i:%s')
                    GROUP BY atc.Id
                    ORDER BY atc.Views DESC
                    LIMIT ${n}`;
        return db.load(query);
    },

    // Top N N most viewed by subcate for most viewed articles
    getTopNViewedBySubCate: (cate,date,n) =>{
        var query = `SELECT atc.*,dr.*,COUNT(cmt.Id) as TotalCmt,DATE_FORMAT(atc.PublishTime, "%d-%c-%Y") as PublishDate,wr.Alias
                    FROM Articles atc
                    INNER JOIN Drafts dr
                    ON dr.Id = atc.Draft and dr.State = 4 and dr.Category = ${cate}
                    INNER JOIN Writers wr
                    ON wr.Id = dr.Author
                    INNER JOIN Comments cmt
                    ON cmt.Id = atc.Draft
                    WHERE atc.PublishTime < STR_TO_DATE('${date}', '%Y-%m-%d %H:%i:%s')
                    GROUP BY atc.Id
                    ORDER BY atc.Views DESC
                    LIMIT ${n}`;
        return db.load(query);
    },

    // Top N N most viewed by tag for most viewed articles
    getTopNViewedByTag: (tag,date,n) => {
        var query = `SELECT atc.*,dr.*,COUNT(cmt.Id) as TotalCmt,DATE_FORMAT(atc.PublishTime, "%d-%c-%Y") as PublishDate,wr.Alias
                    FROM Articles atc
                    INNER JOIN Drafts dr
                    ON dr.Id = atc.Draft and dr.State = 4 
                    INNER JOIN Writers wr
                    ON wr.Id = dr.Author
                    INNER JOIN Drafts_Tags dt
                    ON dt.idTag = ${tag}
                    INNER JOIN Comments cmt
                    ON cmt.Id = atc.Draft
                    WHERE atc.PublishTime < STR_TO_DATE('${date}', '%Y-%m-%d %H:%i:%s')
                    GROUP BY atc.Id
                    ORDER BY atc.Views DESC
                    LIMIT ${n}`;
        return db.load(query);
    }
}