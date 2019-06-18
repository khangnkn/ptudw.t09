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

  ByEditor: id => {
    var sql = `SELECT drafts.Id, drafts.Title, drafts.Date, drafts.Cover, drafts.Content, drafts.Abstract, subcategories.Name as "Category", writers.Alias
    FROM drafts JOIN writers on drafts.Author = writers.Id AND drafts.State = 1
    JOIN subcategories ON subcategories.Id = drafts.Category
    JOIN editors ON subcategories.Category = editors.ManagedCate AND editors.Id = ${id}`
    return db.load(sql);
  },

  PublishByEditor: id => {
    var sql = `SELECT drafts.Id, drafts.Title, drafts.Date, drafts.Cover, drafts.Content, drafts.Abstract, subcategories.Name as "Category", writers.Alias
    FROM drafts JOIN writers on drafts.Author = writers.Id AND drafts.State = 4
    JOIN subcategories ON subcategories.Id = drafts.Category
    JOIN editors ON subcategories.Category = editors.ManagedCate AND editors.Id = ${id}`
    return db.load(sql);
  },

  byWriterStatus: (id, status) => {
    var sql = `SELECT drafts.Id, drafts.Title, drafts.Date, drafts.Cover, drafts.Content, drafts.Abstract, subcategories.Name as "Category", writers.Alias 
    FROM drafts JOIN writers ON drafts.Author = writers.Id AND drafts.State = ${status} AND writers.Id = ${id} 
    JOIN subcategories ON subcategories.Id = drafts.Category`;
    return db.load(sql);
  },

  updateStatus: (id, status) => {
    var obj = {
      Id: id,
      State: status,
    }
    return db.update("drafts", obj)
  }
};