'use strict';

var AuthController = require('../controllers/auth.controller');

var express = require('express'),
    router = express.Router(),
    DecisionController = require('../controllers/decision.controller');

router
    .get('/', AuthController.isLoggedIn, AuthController.isFascilitator, DecisionController.getAllDecisions)
    .get('/:id', AuthController.isLoggedIn, AuthController.isFascilitator, DecisionController.getDecisionById)
    .put('/', AuthController.isLoggedIn, AuthController.isFascilitator, DecisionController.restartDecision)
    .post('/', AuthController.isLoggedIn, AuthController.isFascilitator, DecisionController.createDecision);

module.exports = router;