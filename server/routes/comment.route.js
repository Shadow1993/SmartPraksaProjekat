'use strict';

var express = require('express'),
    router = express.Router(),
    CommentController = require('../controllers/comment.controller');

router
    .get('/:id', CommentController.getAllComments)
    .post('/', CommentController.createComment);

module.exports = router;