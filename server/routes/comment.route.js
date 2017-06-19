'use strict';
var AuthController = require('../controllers/auth.controller');

var express = require('express'),
    router = express.Router(),
    CommentController = require('../controllers/comment.controller');

router
    .get('/:id',  AuthController.isLoggedIn, AuthController.isFascilitator, AuthController.isVoter, AuthController.isViewer, CommentController.getAllComments)
    .post('/', AuthController.isLoggedIn, AuthController.isFascilitator, AuthController.isVoter, AuthController.isViewer, CommentController.createComment);

module.exports = router;