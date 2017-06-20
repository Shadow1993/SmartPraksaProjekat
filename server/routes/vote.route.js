'use strict';

var AuthController = require('../controllers/auth.controller');

var express = require('express'),
    router = express.Router(),
    VoteController = require('../controllers/vote.controller');

router
    .post('/', AuthController.isLoggedIn, VoteController.createVote)
    .put('/', AuthController.isLoggedIn, VoteController.editVote);

module.exports = router;