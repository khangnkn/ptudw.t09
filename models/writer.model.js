var db = require('../utils/db.util');

module.exports = {
    byId: id => {
        var sql = `select * from Writers where Id = "${id}"`
        console.log(sql);
        db.load(sql).then(data => {
            return data[0]
        }).catch(err => console.log(err))
    }
}