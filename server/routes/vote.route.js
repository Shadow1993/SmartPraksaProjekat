'use strict';

var AuthController = require('../controllers/auth.controller');

var express = require('express'),
    router = express.Router(),
    VoteController = require('../controllers/vote.controller');

router
    .post('/', AuthController.isLoggedIn, AuthController.isVoter, VoteController.createVote)
    .put('/', AuthController.isLoggedIn, AuthController.isVoter, VoteController.editVote);

module.exports = router;