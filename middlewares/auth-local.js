const writers = require('../models/writer.model');

module.exports = (req, res, next) => {
    if (req.user) {
        res.locals.isAuthenticated = true;
        res.locals.authUser = req.user;
        console.log(req.user.Id);
        writers.byId(req.user.Id).then(rows => {
            if (rows.length != 0) {
                res.locals.isWriter = true;
                next();
            } else {
                next();
            }
        }).catch(err => console.log(err))
    } else {
        next();
    }
}