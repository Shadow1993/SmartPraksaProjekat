'use strict';

var express = require('express'),
    router = express.Router(),
    CommentController = require('../controllers/comment.controller');

router
    .post('/', CommentController.createComment)
    .put('/', CommentController.editComment)
    .get('/:id', CommentController.getAllComments);

module.exports = router;