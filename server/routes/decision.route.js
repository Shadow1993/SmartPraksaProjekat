'use strict';

var AuthController = require('../controllers/auth.controller');

var express = require('express'),
    router = express.Router(),
    DecisionController = require('../controllers/decision.controller');

router
    .get('/:offset/:limit',  DecisionController.getAllDecisions)
    .get('/:id/:offset/:limit', DecisionController.getDecisionById)
    .put('/', AuthController.isLoggedIn, AuthController.isFacilitator, DecisionController.restartDecision)
    .post('/', AuthController.isLoggedIn, AuthController.isFacilitator, DecisionController.createDecision);

module.exports = router;