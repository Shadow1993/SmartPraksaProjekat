'use strict';

var express = require('express'),
    router = express.Router(),
    DecisionController = require('../controllers/decision.controller');

router
    .get('/', DecisionController.getAllDecisions)
    .get('/:id', DecisionController.getDecisionById)
    .post('/', DecisionController.createDecision)
    .delete('/:id', DecisionController.deleteDecisionById)
    .put('/', DecisionController.restarDecision);

module.exports = router;