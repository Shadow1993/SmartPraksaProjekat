'use strict';

var RoleModel = require('../models/role.model');

module.exports.isLoggedIn = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.send('Please login to continue');
    }
};

module.exports.isAdmin = function (req, res, next) {
    if (req.user.role.indexOf('Administrator') > -1) {
        next();
    } else {
        res.send('you are not authorized');
    }
};
//decide if decision is passed or rejected
//user cant vote 2 times