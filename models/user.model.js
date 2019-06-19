var db = require("../utils/db.util");

module.exports = {
    getWriterForWelcome: () => {
        return db.load(`select users.Id,Username,Fullname,Email,date_format(Birthday,"%Y-%d-%m") as Birthday,Avatar,writers.Alias
                        from users 
                        inner join writers on users.Id = writers.Id`);
    },
    getSubscriberForWelcome: () => {
        return db.load(`select users.Id,Username,Fullname,Email,date_format(Birthday,"%Y-%d-%m") as Birthday,Avatar,subcribers.Premium
                        from users 
                        inner join subcribers on subcribers.Id = users.Id`);
    },
    getEditorForWelcome: () => {
        return db.load(`select users.Id,Username,Fullname,Email,date_format(Birthday,"%Y-%d-%m") as Birthday,Avatar,editors.ManagedCate
                        from users 
                        inner join editors on editors.Id = users.Id`);
    },
    update: entity => {
        return db.update('users','Id',entity);
    },
    updatePremiumByUser: (id,premium) => {
        return db.load(`update subcribers set Premium = ${premium} where Id = ${id}`);
    },
    updateInfor: (Id,Fullname,Email,Birthday,Avatar) => {
        
        return db.load(`
        update users set Fullname = '${Fullname}',Email='${Email}',Birthday=STR_TO_DATE('${Birthday}','%Y-%d-%m'),Avatar='${Avatar}' where Id = ${Id}`);
    },
    updateAliasByUser: (id,alias) => {
        return db.load(`update writers set Alias= '${alias}' where Id = ${id}`);
    },
    updateManagedCate: (id,cate) => {

        return db.load(`update editors set ManagedCate=${cate} where Id = ${id}`);
    },
    addUser: object => {
        return db.insert("users", object);
    }
}