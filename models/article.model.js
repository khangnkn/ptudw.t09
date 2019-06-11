var db = require("../utils/db.util");

module.exports = {
  add: article => {
    return db.insert("drafts", article);
  },

  GetDetail: id => {
    var sql = `SELECT ar.Id, ar.Title, ar.Date, ar.Cover, ar.Abstract, ar.Content, wr.Alias as \"Author\", sc.Name as \"Category\" FROM Articles ar, Writers wr, SubCategories sc WHERE ar.Author = wr.Id and ar.Category = sc.Id and ar.Id = ${id} limit 1`;
    return db.load(sql)
  },

  GetTop4: () => {
    var sql = `SELECT ar.Id, ar.Title, ar.Date, ar.Cover, ar.Abstract, wr.Alias as "Author", sc.Name as "Category"
        FROM Articles ar, Writers wr, SubCategories sc
        WHERE ar.Author = wr.Id and ar.Category = sc.Id and ar.Date >= DATE(NOW()) + INTERVAL -7 DAY
        ORDER BY ar.View DESC
        LIMIT 5`;
    return db.load(sql)
  },

  IncreaseView: id => {
    var sql = `UPDATE Articles SET View = View + 1 WHERE Id = ${id} `
    db.executeNoReturn(sql)
  }
}