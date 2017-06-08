'use strict';

var express = require('express'),
    router = express.Router(),
    UserController = require('../controllers/user.controller');

router
    .get('/', UserController.getAllUsers)
    .get('/:id', UserController.getUserByID)
    .delete('/:id', UserController.deleteUserById)
    .put('/', UserController.updateUser)
    .post('/', UserController.createUser);

module.exports = router;