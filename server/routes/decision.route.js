'use strict';

var AuthController = require('../controllers/auth.controller');

var express = require('express'),
    router = express.Router(),
    DecisionController = require('../controllers/decision.controller');

router
    .get('/', AuthController.isLoggedIn,  DecisionController.getAllDecisions)
    .get('/:id', AuthController.isLoggedIn,  DecisionController.getDecisionById)
    .put('/', AuthController.isLoggedIn,  DecisionController.restartDecision)
    .post('/', AuthController.isLoggedIn,  DecisionController.createDecision);

module.exports = router;

//proveri da li za mongoose svuda trebaju promisi ili mogu i callback
//promena nekih kverija
//authorizacija za sve usere - genericka funkcija
//start with sequelize / & ionic