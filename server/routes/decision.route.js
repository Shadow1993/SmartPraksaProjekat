'use strict';

var express = require('express'),
    router = express.Router(),
    DecisionController = require('../controllers/decision.controller');

router
    .get('/', DecisionController.getAllDecisions)
    .get('/:id', DecisionController.getDecisionById)
    .post('/', DecisionController.createDecision)
    .put('/', DecisionController.restartDecision);

module.exports = router;