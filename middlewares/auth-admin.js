const adminModel = require("../models/admin.model");
module.exports = (req, res, next) => {
    if (!req.user || req.user.isAdmin == false) {
        res.redirect('/admin/login');
    } else {
        adminModel.byUsername(req.user.user.Username).then(rows =>{
            if (rows.length > 0){
                next();
            } else {
                res.redirect('/admin/login');
            }
        }).catch(err=>{
            res.end('error occurred')
        });
    }
}