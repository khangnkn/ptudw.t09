var db = require("../utils/db.util");

module.exports = {
  GetTop4: () => {
    var sql =
      "select Id, Title, Author, Date, Category, Cover, Abstract from Articles limit 1";
    return db.load(sql);
  },
  add: article => {
    return db.insert("drafts", article);
  },
};
