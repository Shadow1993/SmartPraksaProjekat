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

module.exports.isFascilitator = function (req, res, next) {
    RoleModel.find({ _id: req.user.role}, function(err, roleDb) {
        if (err) {
            res.send(err);
        } else if (roleDb[0].title === 'Fascilitator' || roleDb[1].title === 'Fascilitator') {
            next();
        } else {
            res.send('you are not authorized');
        }
    });
};

module.exports.isVoter = function (req, res, next) {
    RoleModel.find({ _id: req.user.role}, function(err, roleDb) {
        if (err) {
            res.send(err);
        } else if (roleDb[0].title === 'Voter' || roleDb[1].title === 'Voter') {
            next();
        } else {
            res.send('you are not authorized');
        }
    });
};

module.exports.isViewer = function (req, res, next) {
    RoleModel.findOne({ _id: req.user.role}, function(err, roleDb) {
        if (err) {
            res.send(err);
        } else if (roleDb.title === 'Viewer') {
            next();
        } else {
            res.send('you are not authorized');
        }
    });
};