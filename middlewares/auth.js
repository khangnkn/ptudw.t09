module.exports = (req, res, next) => {
    if (!req.user) {
        res.redirect('/subscriber/login');
    } else {
        console.log(req.user);
        next();
    }
}