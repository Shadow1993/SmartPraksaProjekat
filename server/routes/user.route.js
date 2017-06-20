'use strict';

var AuthController = require('../controllers/auth.controller');

var express = require('express'),
    router = express.Router(),
    UserController = require('../controllers/user.controller');

router
    .get('/', AuthController.isLoggedIn,   UserController.getAllUsers)
    .get('/:id', AuthController.isLoggedIn, UserController.getUserByID)
    .post('/', AuthController.isLoggedIn, UserController.createUser)
    .put('/',  AuthController.isLoggedIn, UserController.updateUser)
    .delete('/:id', AuthController.isLoggedIn, UserController.deleteUserById);

module.exports = router;