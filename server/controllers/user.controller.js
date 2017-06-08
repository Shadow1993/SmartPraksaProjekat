'use strict';
var UserModel = require('../models/user.model'),
    RoleModel = require('../models/role.model');

module.exports.getAllUsers = function (req, res) {
    UserModel.find({})
        .populate('role')
        .exec(function(err, userDb) {
            if (err) {
                console.log(err);
            } else {
                console.log(userDb);
                res.send(userDb);
            }
        });
};

module.exports.getUserByID = function (req, res) {
    console.log('here is my id: ' + req.params.id);
    UserModel.findOne({_id: req.params.id})
        .populate('role')
        .exec(function(err, userDb) {
            if (err) {
                console.log(err);
            } else {
                console.log(userDb);
                res.send(userDb);
            }
        })
};

module.exports.deleteUserById = function (req, res) {
    console.log('my delete id: ' + req.params.id);
    UserModel.findOneAndRemove({ _id: req.params.id }, function (err, userDb) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(userDb);
            res.send(userDb);
        }
    });
};

module.exports.updateUser = function (req, res) {
    //TODO change to work properly+
    console.log('my body put params: ' + req.body.id + req.body.username + req.body.role);

    RoleModel.find({
        title: {
            $in: req.body.role
        }
    }, function (err, roleDb) {
        if (err) {
            console.log(err);
        } else {
            console.log(roleDb);
            UserModel.findByIdAndUpdate(req.body.id, {
                $set: {
                    username: req.body.username,
                    role: roleDb
                }
            }, function (err, userDb) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(userDb);
                }
            });
        }
    });
};

module.exports.createUser = function (req, res) {
    console.log(req.body.test);
    RoleModel.find({
        title: {
            $in: req.body.role
        }
    }, function (err, roleDb) {
        if (err) {
            console.log(err);
        } else {
            console.log(roleDb);
            UserModel.create({
                username: req.body.username,
                password: req.body.password,
                dateCreated: req.body.dateCreated,
                role: roleDb
            }, function (err, userDb) {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    console.log(userDb);
                    res.send(userDb);
                }
            });
        }
    });
};
/*
GET USERS ('/users', GET) => params = {}
GET USER ('/users/:id', GET) => params = id
DELETE USER ('/users/:id', DELETE) => params = id
UPDATE USER ('/users', PUT) => body = id, username, role
CREATE USER ('/users', POST) => body = username, password, role, dateCreated
*/