'use strict';
var AuthController = require('../controllers/auth.controller');

var express = require('express'),
    router = express.Router(),
    CommentController = require('../controllers/comment.controller');

router
    .get('/:id/:limit/:offset',  AuthController.isLoggedIn, CommentController.getAllComments)
    .post('/', AuthController.isLoggedIn, CommentController.createComment);

module.exports = router;