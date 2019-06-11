var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var subscriberModel = require('../models/subscriber.model');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    var ls = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, done) => {
        subscriberModel
            .singleByEmail(email).then(rows => {
                if (rows.length === 0) {
                    return done(null, false, {
                        message: 'Invalid email.'
                    });
                }

                var user = rows[0];
                var ret = bcrypt.compareSync(password, user.Password);
                if (password == user.Password) {
                    return done(null, user);
                }

                return done(null, false, {
                    message: 'Invalid password.'
                });
            }).catch(err => {
                return done(err, false);
            })
    });

    passport.use(ls);

    passport.serializeUser((user, done) => {
        return done(null, user);
    });

    passport.deserializeUser((user, done) => {
        return done(null, user);
    });
}