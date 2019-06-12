var db = require("../utils/db.util");

module.exports = {
  add: article => {
    return db.insert("drafts", article);
  },

  load: id => {
    var sql = `SELECT dr.Id, dr.Title, dr.Date, dr.Cover, dr.Abstract, dr.Content, wr.Alias as Author FROM drafts as dr, writers as wr WHERE dr.Id = ${id} AND dr.Author = wr.Id`;
    return db.load(sql);
  },

  loadByUser: id => {
    var sql = `SELECT dr.Id, dr.Title, dr.Date, dr.Cover, dr.Abstract, dr.Content, wr.Alias as Author, ca.Name as Category FROM drafts as dr, writers as wr, categories as ca WHERE dr.Author = ${id} AND dr.Author = wr.Id AND ca.Id = dr.Category`;
    return db.load(sql);
  },
};
