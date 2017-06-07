'use strict';

var express = require('express'),
    router = express.Router(),
    userController = require('../controllers/user.controller'),
    userModel = require('../models/user.model');

router.get('/', function(req, res) {
    console.log('hihihi');
    userModel.find({}, function(err, userDb) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(userDb);
            res.send(userDb);
        }
    });
});

module.exports = router;