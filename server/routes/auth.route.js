'use strict';

var RoleModel = require('../models/role.model');

module.exports = function (app, passport) {
    app
        .post('/login', function (req, res, next) {
            passport.authenticate('local-login', function (err, user, info) {
                if (err) { res.send({ status: 401, message: 'error' }); }
                if (!user) { res.send({ status: 401, message: 'wrong username or password' }); }
                req.logIn(user, function (err) {
                    if (err) { return next(err); }
                    RoleModel.find({ _id: req.user.role }, function (err, roleDb) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(roleDb);
                            return res.send({ user: req.user, role: roleDb });
                        }
                    });
                });
            })(req, res, next);
        })
        .get('/logout', function (req, res) {
            console.log(req.user);
            req.logout();
            res.redirect('/');
        })
        .get('/checkLogin', function (req, res) {
            if (req.user) {
                RoleModel.find({ _id: req.user.role }, function (err, roleDb) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    } else {
                        console.log(roleDb)
                        return res.send({ user: req.user, role: roleDb });
                    }
                });
            } else {
                res.send({ message: 'there is no user logged in atm!' });
            }
        });
};

//auth rute

//edit user password

