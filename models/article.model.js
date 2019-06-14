var db = require("../utils/db.util");

module.exports = {
  add: article => {
    return db.insert("drafts", article);
  },

  GetDetail: id => {
    var sql = `SELECT articles.Id, drafts.Title, drafts.Abstract, drafts.Cover, writers.Alias, drafts.Content, articles.Premium, articles.PublishTime, articles.Views
    FROM articles JOIN drafts ON articles.Draft = drafts.Id and articles.Id = ${id} 
    JOIN writers ON drafts.Author = writers.Id `
    return db.load(sql)
  },

  GetTopViews: () => {
    var sql = `SELECT articles.Id, drafts.Title, drafts.Abstract, drafts.Cover, writers.Alias, drafts.Content, articles.Premium, articles.PublishTime as "Date", articles.Views, subcategories.Name as "Category" 
    FROM articles JOIN drafts ON articles.Draft = drafts.Id 
    JOIN writers ON drafts.Author = writers.Id 
    JOIN subcategories ON drafts.Category = subcategories.Id 
    ORDER BY Views DESC 
    LIMIT 5`;
    return db.load(sql);
  },

  Comments: id => {
    var sql = `SELECT comments.Time, comments.Content, users.Fullname
    FROM comments, users
    WHERE comments.User = users.Id
    AND comments.Article = ${id}`
    return db.load(sql)
  },

  IncreaseView: id => {
    var sql = `UPDATE articles SET Views = Views + 1 WHERE Id = ${id} `;
    db.executeNoReturn(sql);
  },
};