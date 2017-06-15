'use strict';

var AuthController = require('../controllers/auth.controller');

var express = require('express'),
    router = express.Router(),
    DecisionController = require('../controllers/decision.controller');

router
    .get('/', AuthController.isLoggedIn,  DecisionController.getAllDecisions)
    .get('/:id',  AuthController.isLoggedIn,  DecisionController.getDecisionById)
    .post('/',  AuthController.isLoggedIn,  DecisionController.createDecision);

module.exports = router;