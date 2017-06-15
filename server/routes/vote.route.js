'use strict';

var AuthController = require('../controllers/auth.controller');

var express = require('express'),
    router = express.Router(),
    VoteController = require('../controllers/vote.controller');

router
    .post('/',  VoteController.createVote)
    .put('/',  VoteController.editVote);

module.exports = router;