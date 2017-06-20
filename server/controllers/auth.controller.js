'use strict';

var RoleModel = require('../models/role.model');

module.exports.isLoggedIn = function (req, res, next) {
    if (req.user) {
        return next();
    } else {
        res.status(401).send('Please login to continue');
    }
};

module.exports.isAdmin = function (req, res, next) {
    RoleModel.findOne({ _id: req.user.role })
        .exec(function (err, roleDb) {
            if (err) {
                return next(err.message);
            } else {
                console.log(roleDb);
                if (roleDb.title === 'Administrator') {
                    return next();
                } else {
                    res.status(403).send('You are not authorized');
                }
            }
        });
};

module.exports.isViewer = function (req, res, next) {
    RoleModel.find({ _id: req.user.role })
        .exec(function (err, roleDb) {
            if (err) {
                return next(err.message);
            } else {
                var test = false;
                for (var i = 0; i < roleDb.length; i++) {
                    console.log(roleDb[i]);
                    if (roleDb[i].title === 'Viewer') {
                        test = true;
                    }
                }
                if (test) {
                    next();
                } else {
                    res.status(401).send('u no view');
                }
            }
        })
};