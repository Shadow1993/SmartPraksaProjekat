'use strict';

var RoleModel = require('../models/role.model');

module.exports.isLoggedIn = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports.isAdmin = function (req, res, next) {
    RoleModel.findOne({ _id: req.user.role}, function(err, roleDb) {
        if (err) {
            res.send(err);
        } else if (roleDb.title === 'Administrator') {
            next();
        } else {
            res.send('you are not authorized');
        }
    });
};
