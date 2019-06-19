const writers = require('../models/writer.model');
const editors = require('../models/editor.model');

module.exports = (req, res, next) => {
    if (req.user) {
        res.locals.isAuthenticated = true;
        res.locals.authUser = req.user;
        user = req.user;
        Promise.all([editors.byId(user.Id), writers.byId(user.Id)])
            .then(([isEditor, isWriter]) => {
                if (isEditor.length != 0) {
                    res.locals.isEditor = true;
                }
                if (isWriter.length != 0) {
                    res.locals.isWriter = true;
                }
                next();
                return;
            })
            .catch(err => {
                console.log(err);
                next();
            })
    } else {
        next();
    }
}