'use strict';

var RoleModel = require('../models/role.model');

module.exports.isLoggedIn = function (req, res, next) {
    console.log(req.user);
    if (req.user) {
        return next();
    } else {
        res.status(401).send('Please login to continue');
    }
};

module.exports.isAdmin = function (req, res, next) {
    RoleModel.find({ _id: req.user.role })
        .exec(function (err, roleDb) {
            if (err) {
                return next(err.message);
            } else {
                console.log(roleDb);
                var test = false;
                for (var i = 0; i < roleDb.length; i++) {
                    console.log(roleDb[i]);
                    if (roleDb[i].title === 'Administrator') {
                        test = true;
                    }
                }
                if (test) {
                    next();
                } else {
                    res.status(401).send('You are not authorized Administrator');
                }
            }
        });
};