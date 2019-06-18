const writers = require("../models/writer.model");

module.exports = (req, res, next) => {
    if (!req.user) {
        res.redirect('/subscriber/login');
    } else {
        writers.byId(req.user.Id)
            .then(data => {
                console.log(data);
                if (data.length == 0) {
                    res.redirect('/subscriber/login');
                } else {
                    next()
                }
            })
            .catch(err => {
                next(err)
            });
    }
}