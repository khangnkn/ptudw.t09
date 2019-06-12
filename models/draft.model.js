var db = require("../utils/db.util");

module.exports = {
  add: article => {
    return db.insert("drafts", article);
  },

  get: id => {
    var sql = `SELECT dr.Id, dr.Title, dr.Date, dr.Cover, dr.Abstract, dr.Content, wr.Alias FROM drafts as dr, writers as wr WHERE dr.Id = ${id} AND dr.Author = wr.Id`;
  },
};
