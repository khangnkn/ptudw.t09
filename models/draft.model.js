var db = require("../utils/db.util");

module.exports = {
  add: article => {
    return db.insert("drafts", article);
  },

  detailById: id => {
    var sql = `SELECT dr.Id, dr.Title, dr.Date, dr.Cover, dr.Abstract, dr.Content, wr.Alias FROM drafts as dr, writers as wr WHERE dr.Id = ${id} AND dr.Author = wr.Id`;
    return db.load(sql);
  },

  loadByUser: id => {
    var sql = `SELECT dr.Id, dr.Title, dr.Date, dr.Cover, dr.Abstract, dr.Content, wr.Alias, ca.Name as Category, states.Status
    FROM drafts as dr, writers as wr, subcategories as ca, states
    WHERE dr.Author = ${id} AND dr.Author = wr.Id AND ca.Id = dr.Category and dr.State = states.Id`;
    return db.load(sql);
  },
};