'use strict';

var RoleModel = require('../models/role.model');

module.exports = function (app, passport) {
    app
        .post('/login', function (req, res, next) {
            passport.authenticate('local-login', function (err, user, info) {
                if (err) { res.status(401).send('wrong username or password'); }
                if (!user) { res.status(401).send('wrong username or password'); }
                req.logIn(user, function (err) {
                    if (err) { return next(err.message); }
                    RoleModel.find({ _id: req.user.role }, function (err, roleDb) {
                        if (err) {
                            return next(err.message);
                        } else {
                            console.log(roleDb);
                            res.send({ user: req.user, role: roleDb });
                        }
                    });
                });
            })(req, res, next);
        })
        .get('/logout', function (req, res) {
            console.log(req.user);
            req.logout();
            res.send({ message: 'User logged out!' });
        })
        .get('/checkLogin', function (req, res, next) {
            if (req.user) {
                RoleModel.find({ _id: req.user.role }, function (err, roleDb) {
                    if (err) {
                        console.log(err);
                        return next(err);
                    } else {
                        console.log(roleDb)
                        res.send({ user: req.user, role: roleDb });
                    }
                });
            } else {
                res.send({ message: 'there is no user logged in!' });
            }
        });
};
