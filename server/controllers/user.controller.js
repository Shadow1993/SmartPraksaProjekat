'use strict';
var UserModel = require('../models/user.model'),
    RoleModel = require('../models/role.model');

module.exports.getAllUsers = function(req, res) {
        UserModel.find({}, function(err, userDb) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log(userDb);
                res.send(userDb);
            }
        });
    };

module.exports.getUserByID = function(req, res) {
        console.log('here is my id: ' + req.params.id);
        UserModel.findOne({_id: req.params.id}, function(err, userDb) {
            if (err) {
                console.log(err);
                res.send('err');
            } else {
                console.log(userDb);
                res.send(userDb);
            }
        });
    };

module.exports.deleteUserById = function(req, res) {
        console.log('my delete id: '  + req.params.id);
        UserModel.findOneAndRemove({_id: req.params.id}, function(err, userDb) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log(userDb);
                res.send(userDb);
            }
        });
    };

module.exports.updateUser = function(req, res) {
    //TODO change to work properly
        console.log('my body put params: ' + req.body.id + req.body.username);

        UserModel.findByIdAndUpdate(req.body.id, {$set: {username: req.body.username}}, function(err, userDb) {
            if (err) {
                console.log(err);
                res.send(userDb);
            } else {
                console.log(userDb);
                res.send(userDb);
            }
        });
    };

module.exports.createUser = function(req, res) {
    //TODO change to work with new database
        console.log(req.body);
        var rolesTemp = [];
        console.log(role);
        for (var i in req.body.role) {
            console.log(req.body.role[i]);
            RoleModel.find({title: req.body.role[i].title}, function(err, roleDb) {
                if (err) {
                    console.log(err);
                } else {
                    rolesTemp.push(roleDb._id);
                }
            });
        }
/*
        UserModel.create({
            username: req.body.username,
            password: req.body.password,
            role: rolesTemp
            },
            function(err, userDb) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(userDb);
                }
            });
            */
            res.send('ok ok ok');
/*
        RoleModel.find({title: req.body.role}, function(err, roleDb) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {

                UserModel.create({
                    username: req.body.username,
                    password: req.body.password,
                    role: roleDb._id,
                    dateCreated: req.body.dateCreated
                }, function(err, userDb) {
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
        */
    };
/*
GET USERS ('/users', GET) => params = {}
GET USER ('/users/:id', GET) => params = id
DELETE USER ('/users/:id', DELETE) => params = id
UPDATE USER ('/users', PUT) => body = id, username
CREATE USER ('/users', POST) => body = username, password, role, dateCreated
*/