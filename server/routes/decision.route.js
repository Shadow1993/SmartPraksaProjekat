'use strict';

var express = require('express'),
    router = express.Router(),
    DecisionController = require('../controllers/decision.controller');

router
    .get('/', DecisionController.getAllDecisions)
    .get('/:id', DecisionController.getDecisionById)
    .delete('/:id', DecisionController.deleteDecisionById)
    .post('/', DecisionController.createDecision);

module.exports = router;