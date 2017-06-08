'use strict';

var DecisionModel = require('../models/decision.model');

module.exports.getAllDecisions = function(req, res) {
        DecisionModel.find({})
            .populate(['comments', 'votes'])
            .exec(function (err, decisionDb) {
                if (err) {
                    console.log(err);
                    res.send('ERRORCHINA');
                } else {
                    console.log(decisionDb);
                    res.send(decisionDb);
                }
            });
};

module.exports.getDecisionById = function(req, res) {
    console.log(req.params.id);
    DecisionModel.findById({_id: req.params.id}, function(err, decisionDb) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(decisionDb);
            res.send(decisionDb);
        }
    });
};

module.exports.deleteDecisionById = function(req, res) {
    console.log(req.params.id);
    DecisionModel.findByIdAndRemove({_id: req.params.id}, function(err, decisionDb) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log('Deleted decision: ' + decisionDb);
            res.send(decisionDb);
        }
    });
};

module.exports.createDecision = function(req, res) {
    //TODO change to work properly
    console.log(req.body);
    DecisionModel.create({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        steps: req.body.steps,
        startingDate: req.body.startingDate,
        expirationDate: req.body.expirationDate,

    }, function(err, decisionDb) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(decisionDb);
            res.send(decisionDb);
        }
    });
};
