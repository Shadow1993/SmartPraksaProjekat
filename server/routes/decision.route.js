'use strict';

var AuthController = require('../controllers/auth.controller');

var express = require('express'),
    router = express.Router(),
    DecisionController = require('../controllers/decision.controller');

router
    .get('/',  DecisionController.getAllDecisions)
    .get('/:id',    DecisionController.getDecisionById)
    .put('/', DecisionController.restartDecision)
    .post('/',   DecisionController.createDecision);

module.exports = router;