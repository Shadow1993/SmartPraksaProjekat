'use strict';
var UserModel = require('../models/user.model'),
    RoleModel = require('../models/role.model');

/*
* GET USERS ('/users', GET) => params = {}
* GET USER ('/users/:id', GET) => params = id
* DELETE USER ('/users/:id', DELETE) => params = id
* UPDATE USER ('/users', PUT) => body = id, username, role
* CREATE USER ('/users', POST) => body = username, password, role, dateCreated
*/

//filtriranje is active
module.exports.getAllUsers = function (req, res) {
    UserModel.find({isActive: true})
        .populate('role')
        .exec(function (err, userDb) {
            if (err) {
                console.log(err.message);
                res.send({message: 'error while retreiving all users from db'});
            } else {
                console.log(userDb);
                res.send(userDb);
            }
        });
};

//filtriranje is active
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

module.exports.deleteUserById = function (req, res) {
    console.log(req.params);
    UserModel.findByIdAndUpdate(req.params.id, {$set: {isActive: false}},  function (err, userDb) {
        if (err) {
            console.log(err.message);
            res.send({message: 'error while deleting user from db'});
        } else {
            console.log(userDb);
            res.send(userDb);
        }
    });
};

module.exports.updateUser = function (req, res) {
    console.log(req.body);
    RoleModel.find({
        title: {
            $in: req.body.role
        }
    }, function (err, roleDb) {
        if (err) {
            console.log(err.message);
            res.send({message: 'error in user role type'});
        } else {
            console.log(roleDb);
            UserModel.findByIdAndUpdate(req.body.id, {
                $set: {
                    username: req.body.username,
                    role: roleDb
                }
            }, function (err, userDb) {
                if (err) {
                    console.log(err.message);
                    res.send({message: 'error while retreiving user from db'});
                } else {
                    console.log(userDb);
                    res.send(userDb);
                }
            });
        }
    });
};

module.exports.createUser = function (req, res) {
    console.log(req.body);
    RoleModel.find({
        title: {
            $in: req.body.role
        }
    }, function (err, roleDb) {
        if (err) {
            console.log(err.message);
            res.send({message: 'error in role type'});
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
                    res.send({status: 500, message: 'error while writing in db'});
                }
                if (!userDb) {
                    res.send({status: 500, message: 'error in username'});
                } else {
                    console.log(userDb);
                    res.send(userDb);
                }
            });
        }
    });
};