'use strict';

var RoleModel = require('../models/role.model');

module.exports.isLoggedIn = function (req, res, next) {
    if (req.user) {
        return next();
    } else {
        res.send('Please login to continue');
    }
};

module.exports.isAdmin = function (req, res, next) {
    if (req.user.role.indexOf('Administrator') > -1) {
        return next();
    } else {
        res.send({message: 'You are not authorized'});
    }
};