'use strict';

var express = require('express'),
    router = express.Router(),
    UserController = require('../controllers/user.controller');

router
    .get('/', UserController.getAllUsers)
    .get('/:id', UserController.getUserByID)
    .post('/', UserController.createUser)
    .put('/', UserController.updateUser)
    .delete('/:id', UserController.deleteUserById);

module.exports = router;