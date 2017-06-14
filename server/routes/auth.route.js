'use strict';

module.exports = function (app, passport) {
    app.post('/login', function (req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                return res.send(req.user);
            });
        })(req, res, next);
    })
    .get('/logout', function(req, res) {
        console.log(req.user);
        req.logout();
        res.redirect('/');
    });
};