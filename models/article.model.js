var db = require("../utils/db.util");
var subcategories = require('./subcategory.model');

module.exports = {
  add: article => {
    return db.insert("articles", article);
  },

  byCat: id => {
    var sql = `SELECT articles.Id, drafts.Title, drafts.Abstract, drafts.Cover, writers.Alias, drafts.Content, articles.Premium, articles.PublishTime as "Date", subcategories.Name as "Category"
    FROM articles JOIN drafts ON articles.Draft = drafts.Id AND articles.PublishTime <= NOW()
    JOIN writers ON drafts.Author = writers.Id
    JOIN subcategories ON drafts.Category = subcategories.Id AND subcategories.Id = ${id}
    ORDER BY articles.Premium DESC
    LIMIT 10`;
    return db.load(sql);
  },

  byTagName: tagName => {
    var sql = `SELECT articles.Id, drafts.Title, drafts.Abstract, drafts.Cover, writers.Alias, drafts.Content, articles.Premium, articles.PublishTime as "Date", subcategories.Name as "Category"
    FROM articles JOIN drafts ON articles.Draft = drafts.Id AND articles.PublishTime <= NOW()
    JOIN writers ON drafts.Author = writers.Id
    JOIN subcategories ON drafts.Category = subcategories.Id
    JOIN drafts_tags on drafts.Id = drafts_tags.idArticle
    JOIN tags ON drafts_tags.idTag = tags.Id AND tags.Name = "${tagName}"
    ORDER BY articles.Premium DESC
    LIMIT 10`;
    return db.load(sql);
  },

  GetDetail: id => {
    var sql = `SELECT articles.Id, drafts.Title, drafts.Abstract, drafts.Cover, writers.Alias, drafts.Content, articles.Premium, articles.PublishTime, articles.Views
    FROM articles JOIN drafts ON articles.Draft = drafts.Id and articles.Id = ${id} 
    JOIN writers ON drafts.Author = writers.Id `;
    return db.load(sql);
  },

  GetMostComment: () => {
    var sql = `SELECT articles.Id, drafts.Title, drafts.Abstract, drafts.Cover, writers.Alias, drafts.Content, articles.Premium, DATE_FORMAT(articles.PublishTime, '%d/%m/%Y') as "Date", articles.Views, subcategories.Name as "Category", COUNT(comments.Id) as "Comments"
    FROM articles JOIN drafts ON articles.Draft = drafts.Id  AND articles.PublishTime <= NOW()
    JOIN writers ON drafts.Author = writers.Id 
    JOIN subcategories ON drafts.Category = subcategories.Id
    LEFT JOIN comments ON comments.Article = articles.Id
    GROUP BY articles.Id
    ORDER BY COUNT(comments.Id) DESC
    LIMIT 5;`
    return db.load(sql);
  },

  GetTopViews: () => {
    var sql = `
        SELECT articles.Id, drafts.Title, drafts.Abstract, drafts.Cover, writers.Alias, drafts.Content, articles.Premium, DATE_FORMAT(articles.PublishTime, '%d/%m/%Y') as "Date", articles.Views, subcategories.Name as "Category"
        FROM articles JOIN drafts ON articles.Draft = drafts.Id AND articles.PublishTime <= NOW()
        JOIN writers ON drafts.Author = writers.Id
        JOIN subcategories ON drafts.Category = subcategories.Id
        ORDER BY Views DESC
        LIMIT 5 `;
    return db.load(sql);
  },

  newestByCat: id => {
    var sql = `
      SELECT articles.Id, drafts.Title, drafts.Abstract, drafts.Cover, writers.Alias, drafts.Content, articles.Premium, DATE_FORMAT(articles.PublishTime, '%d/%m/%Y') as "Date", articles.Views, subcategories.Name as "Category"
      FROM articles JOIN drafts ON articles.Draft = drafts.Id
      JOIN writers ON drafts.Author = writers.Id
      JOIN subcategories ON drafts.Category = subcategories.Id
      WHERE subcategories.Id = ${id} AND articles.PublishTime <= NOW()
      ORDER BY articles.PublishTime DESC
    `;
    return db.load(sql);
  },

  Comments: id => {
    var sql = `SELECT comments.Time, comments.Content, users.Fullname
        FROM comments, users
        WHERE comments.User = users.Id
        AND comments.Article = ${id}`
    return db.load(sql)
  },

  related: id => {
    var sql = `
    SELECT articles.Id, drafts.Title
    FROM articles JOIN drafts ON articles.Draft = drafts.Id
    WHERE drafts.Category = (
        SELECT drafts.Category
        FROM drafts JOIN articles ON drafts.Id = articles.Draft
        WHERE articles.Id = ${id})
    LIMIT 5`;
    return db.load(sql);
  },

  IncreaseView: id => {
    var sql = `UPDATE articles SET Views = Views + 1 WHERE Id = ${id}`;
    db.execute(sql);
  },

  addTag: (id, tag) => {
    var sql = `INSERT INTO \`tags\`(\`Id\`, \`Name\`) VALUES (${id}, ${tag})`;
    db.execute(sql);
  },

  updatePremium: (idDraft, premium) => {
    return db.load(`update articles
                    set Premium = ${premium}
                    where Draft = ${idDraft}`);
  },
  deleteByDraft: draft => {
    return db.load(`delete from articles where Draft = ${draft}`);
  },

  singleByDraft: draft => {
    return db.load(`select * from articles where Draft = ${draft}`);
  }
};