const editors = require("../models/editor.model");

module.exports = (req, res, next) => {
    if (!req.user) {
        res.redirect('/subscriber/login');
    } else {
        editors.byId(req.params.id)
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