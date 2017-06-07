'use strict';

var express = require('express'),
    router = express.Router(),
    userController = require('../controllers/user.controller');

router
    .get('/', userController.getAllUsers)
    .get('/:id', userController.getUserByID)
    .delete('/:id', userController.deleteUserById)
    .put('/', userController.updateUser)
    .post('/', userController.createUser);

module.exports = router;