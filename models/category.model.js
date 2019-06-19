var db = require('../utils/db.util');

module.exports = {
    byCatId: id => {
        return db.load(`select Name from categories where id = "${id}"`)
    },
    all: () => {
        return db.load(`select * from categories`);
    },
    listForAdmin: () => {
        return db.load(`select categories.*,count(subcategories.Id) as NofSubC
                        from categories
                        left join subcategories on categories.Id = subcategories.Category
                        group by categories.Id
                        order by categories.Id asc`);
    },
    updateName: (id,name) => {
        return db.load(`update categories set Name='${name}' where Id = ${id}`);
    },
    add: name => {
        return db.load(`insert into categories values(default,'${name}')`);
    }
}