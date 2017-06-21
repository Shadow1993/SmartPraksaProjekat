'use strict';
var UserModel = require('../models/user.model'),
    RoleModel = require('../models/role.model');

var bcrypt = require('bcryptjs');
/*
* GET USERS ('/users', GET) => params = {}
* DELETE USER ('/users/:id', DELETE) => params = id
* UPDATE USER ('/users', PUT) => body = id, username, password, role
* CREATE USER ('/users', POST) => body = username, password, role, dateCreated
*/

module.exports.getAllUsers = function (req, res, next) {
    UserModel.find({isActive: true})
        .populate('role')
        .exec(function (err, userDb) {
            if (err) {
                return next(err.message);
            } else {
                res.send(userDb);
            }
        });
};

module.exports.getUserByID = function (req, res) {
    console.log(req.params);
    UserModel.findOne({ _id: req.params.id, isActive: true })
        .populate('role')
        .exec(function (err, userDb) {
            if (err) {
                console.log(err.message);
                res.send({message: 'error while retreiving user from db'});
            } else {
                console.log(userDb);
                res.send(userDb);
            }
        });
};


module.exports.deleteUserById = function (req, res, next) {
    UserModel.findByIdAndUpdate(req.params.id, {$set: {isActive: false}},  function (err, userDb) {
        if (err) {
            return next(err.message);
        } else {
            res.send(userDb);
        }
    });
};

module.exports.updateUser = function (req, res, next) {
    RoleModel.find({
        title: {
            $in: req.body.role
        }
    }, function (err, roleDb) {
        if (err) {
            return next(err.message);
        } else {
            console.log(roleDb);
            UserModel.findByIdAndUpdate(req.body.id, {
                $set: {
                    username: req.body.username,
                    password: generateHash(req.body.password),
                    role: roleDb
                }
            }, function (err, userDb) {
                if (err) {
                    return next(err.message);
                } else {
                    res.send(userDb);
                }
            });
        }
    });
};

module.exports.createUser = function (req, res, next) {
    RoleModel.find({
        title: {
            $in: req.body.role
        }
    }, function (err, roleDb) {
        if (err) {
            return next(err.message);
        }
        if (!roleDb[0]) {
            res.send({message: 'error in role type'});
        } else {
            UserModel.create({
                username: req.body.username,
                password: req.body.password,
                dateCreated: req.body.dateCreated,
                role: roleDb
            }, function (err, userDb) {
                if (err) {
                    return next(err.message)
                }
                if (!userDb) {
                    return next(err.message);
                } else {
                    res.send(userDb);
                }
            });
        }
    });
};

var generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};