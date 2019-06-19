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
    var sql = `SELECT dr.Id, dr.Title, dr.Date, dr.Cover, dr.Abstract, dr.Content, wr.Alias, ca.Name as Category, states.Status, dr.State
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
  getAllForAdminWC: () => {
    var sql = ` select drafts.Id,drafts.Title,wt.Alias as Author,drafts.Abstract,date_format(drafts.Date,"%d-%c-%Y") as Date,drafts.Category,drafts.State,atc.Premium,date_format(atc.PublishTime,"%d-%c-%Y %H:%i:%s") as PublishTime
                from drafts
                left join (
                select Id,Draft,Premium,PublishTime
                from articles
                group by Id,Draft,Premium,PublishTime) atc on atc.Draft = drafts.Id 
                
                left join (
                  select Id,Alias
                  from writers
                  group by Id,Alias) wt on wt.Id = drafts.Author
                  
                group by drafts.Id,Author,atc.Premium,PublishTime
                order by drafts.Id ASC
                `;
    return db.load(sql);
  },
  listByTag: id => {
    return db.load(`
    select drafts.Id,drafts.Title,drafts.Abstract,date_format(drafts.Date,"%d-%c-%Y") as Date,wt.Alias as Author,states.Status as State,subcategories.Name as SubCategory,categories.Name as Category
    from drafts 
    inner join drafts_tags on drafts.Id = drafts_tags.idTag and drafts_tags.idTag = ${id}
    inner join states on states.Id = drafts.State
    inner join subcategories on subcategories.Id = drafts.Category
    inner join categories on subcategories.Category = categories.Id
    left join (
      select Id,Alias
      from writers
      group by Id) wt on wt.Id = drafts.Author `);
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
  },

  listBySub: id => {
    return db.load(`
    select drafts.Id,drafts.Title,date_format(drafts.Date,"%d-%c-%Y") as Date,wt.Alias as Author,states.Status as State,subcategories.Name as SubCategory,categories.Name as Category
    from drafts 
    inner join states on states.Id = drafts.State
    inner join subcategories on subcategories.Id = drafts.Category
    inner join categories on subcategories.Category = categories.Id
    left join (
      select Id,Alias
      from writers
      group by Id) wt on wt.Id = drafts.Author
    where drafts.Category = ${id}`);
  },

  updateByAdmin: (id, scate, state) => {
    return db.load(`update drafts 
                    set State= ${state},Category = ${scate}
                    where Id = ${id}`);
  },

  deleteById: id => {
    return db.load(`delete from drafts where Id = ${id}`)
  },
  searchFTS: key => {
    return db.load(`select articles.Id, drafts.Title, drafts.Abstract, drafts.Cover, drafts.Content 
    from drafts join articles on drafts.Id = articles.Draft
    where match (Title,Abstract) against ('${key}' ) and drafts.State>3`);
  },

  rejectReason: id => {
    var sql = `SELECT * FROM rejectdrafts WHERE Draft = ${id}`;
    return db.load(sql);
  },

  publishedByWriter: id => {
    var sql = `SELECT drafts.Id, Title, subcategories.Name as "Category", DATE_FORMAT(drafts.Date, "%d/%m/%Y") as "Date", Content, Abstract, State, writers.Alias
    FROM drafts JOIN writers ON drafts.Author = writers.Id 
    JOIN subcategories ON drafts.Category = subcategories.Id
    WHERE writers.Id = ${id} AND drafts.State = 4
    LIMIT 10`;
    return db.load(sql);
  },

  rejectedByWriter: id => {
    var sql = `SELECT drafts.Id, Title, subcategories.Name as "Category", DATE_FORMAT(drafts.Date, "%d/%m/%Y") as "Date", Content, Abstract, State, writers.Alias
    FROM drafts JOIN writers ON drafts.Author = writers.Id 
    JOIN subcategories ON drafts.Category = subcategories.Id
    WHERE writers.Id = ${id} AND drafts.State = 2
    LIMIT 10`;
    return db.load(sql);
  },

  pendingByWriter: id => {
    var sql = `SELECT drafts.Id, Title, subcategories.Name as "Category", DATE_FORMAT(drafts.Date, "%d/%m/%Y") as "Date", Content, Abstract, State, writers.Alias
    FROM drafts JOIN writers ON drafts.Author = writers.Id 
    JOIN subcategories ON drafts.Category = subcategories.Id
    WHERE writers.Id = ${id} AND drafts.State = 1
    LIMIT 10`;
    return db.load(sql);
  },

  approvedByWriter: id => {
    var sql = `SELECT drafts.Id, Title, subcategories.Name as "Category", DATE_FORMAT(drafts.Date, "%d/%m/%Y") as "Date", Content, Abstract, State, writers.Alias
    FROM drafts JOIN writers ON drafts.Author = writers.Id 
    JOIN subcategories ON drafts.Category = subcategories.Id
    WHERE writers.Id = ${id} AND drafts.State = 3
    LIMIT 10`;
    return db.load(sql);
  },
};
