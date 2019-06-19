var mysql = require("mysql");
var createConnection = () => {
  return mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "maudoden",
    database: "TechhubDB",
    multipleStatements: true,
  });
};

// var createConnection = () => {
//   return mysql.createConnection({
//     host: "db4free.net",
//     port: 3306,
//     user: "techhub",
//     password: "ptudw.t09",
//     database: "techhub",
//   });
// };
module.exports = {
  load: sql => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.connect();
      connection.query(sql, (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
      connection.end();
    });
  },

  insert: (tableName, obj) => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      var sql = `INSERT INTO ${tableName} set ?`;
      connection.connect();
      connection.query(sql, obj, (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
      connection.end();
    });
  },

  update: (tableName, obj) => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.connect();

      var id = obj.Id;
      delete obj.Id;
      console.log(id);
      var sql = `update ${tableName} set ? where Id = ?`;

      connection.query(sql, [obj, id], (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
      connection.end();
    });
  },

  delete: (tableName, id) => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.connect();

      var sql = `delete from ${tableName} where Id = ?`;
      connection.query(sql, id, (error, results, fields) => {
        if (error) reject(error);
        resolve(results.affectedRows);
      });
      connection.end();
    });
  },

  execute: sql => {
    var connection = createConnection();
    connection.connect();
    connection.query(sql, (error, results, fields) => {
      if (error) console.log(error);
    });
    connection.end();
  },
};