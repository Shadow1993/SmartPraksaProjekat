'use strict';

module.exports = function (app, passport) {
    app.post('/login', function (req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {
            if (err) { res.send({ status: 401, message: 'error' }); }
            if (!user) { res.send({ status: 401, message: 'wrong username or password' }); }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                return res.send(req.user);
            });
        })(req, res, next);
    })
        .get('/logout', function (req, res) {
            console.log(req.user);
            req.logout();
            res.redirect('/');
        });
};