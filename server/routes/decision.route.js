'use strict';

var express = require('express'),
    router = express.Router(),
    decisionController = require('../controllers/decision.controller');

router
    .get('/', decisionController.getAllDecisions)
    .get('/:id', decisionController.getDecisionById)
    .delete('/:id', decisionController.deleteDecisionById)
    .post('/', decisionController.createDecision);

module.exports = router;