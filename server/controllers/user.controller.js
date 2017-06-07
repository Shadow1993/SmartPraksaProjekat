'use strict';
var UserModel = require('../models/user.model');

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
        console.log('my body put params: ' + req.body.id + req.body.newUsername);
        UserModel.findByIdAndUpdate(req.body.id, {$set: {username: req.body.newUsername}}, function(err, userDb) {
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
        console.log('my body post params: ' + req.body.username + req.body.password + req.body.role);
        UserModel.create({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role
        }, function(err, userDb) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log(userDb);
                res.send(userDb);
            }
        });
    };
