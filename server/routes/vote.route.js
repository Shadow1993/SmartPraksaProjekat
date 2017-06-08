'use strict';

var express = require('express'),
    router = express.Router(),
    VoteController = require('../controllers/vote.controller');

router
    .post('/', VoteController.createVote)
    .get('/', VoteController.getAllVotes);

module.exports = router;