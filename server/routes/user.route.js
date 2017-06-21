'use strict';

var AuthController = require('../controllers/auth.controller');

var express = require('express'),
    router = express.Router(),
    UserController = require('../controllers/user.controller');

router
    .get('/', AuthController.isLoggedIn, AuthController.isAdmin, UserController.getAllUsers)
    .get('/', AuthController.isLoggedIn, AuthController.isAdmin, UserController.getUserByID)
    .post('/', AuthController.isLoggedIn, AuthController.isAdmin, UserController.createUser)
    .put('/',  AuthController.isLoggedIn, AuthController.isAdmin, UserController.updateUser)
    .delete('/:id', AuthController.isLoggedIn, AuthController.isAdmin, UserController.deleteUserById);

module.exports = router;