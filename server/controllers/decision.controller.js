'use strict';

/*
* GET DECISIONS ('/decisions', GET) => params = {}
* GET DECISION ('/decisions/:id', GET) => params = id
* CREATE DECISION ('/decisions', POST) => body = title, description, type, steps, startingDate, expirationDate
* RESTART DECISION ('/decisions', PUT) => body = id, title, description, type, steps, startingDate, expirationDate
*/

var DecisionModel = require('../models/decision.model');

module.exports.getAllDecisions = function (req, res) {
    DecisionModel.find({})
        .populate(['comments', 'votes'])
        .exec(function (err, decisionDb) {
            if (err) {
                console.log(err.message);
                res.send({message: 'error while retreiving all decisions from database'});
            } else {
                console.log(decisionDb);
                res.send(decisionDb);
            }
        });
};

module.exports.getDecisionById = function (req, res) {
    console.log(req.params);
    DecisionModel.findById({ _id: req.params.id }, function (err, decisionDb) {
        if (err) {
            console.log(err.message);
            res.send({message: 'error while retreiving decision from database'});
        } else {
            console.log(decisionDb);
            res.send(decisionDb);
        }
    });
};

module.exports.createDecision = function (req, res) {
    console.log(req.body);
    DecisionModel.create({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        steps: req.body.steps,
        startingDate: req.body.startingDate,
        expirationDate: req.body.expirationDate
    }, function (err, decisionDb) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(decisionDb);
            res.send(decisionDb);
        }
    });
};

module.exports.restartDecision = function (req, res) {
    //$pull for comments and votes
    console.log(req.body);
    DecisionModel.findByIdAndUpdate({ _id: req.body.id }, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            steps: req.body.steps,
            startingDate: req.body.startingDate,
            expirationDate: req.body.expirationDate
        }
    }, {$pull: {comments}}, function(err, decisionDb) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(decisionDb);
            res.send(decisionDb);
        }
    });
};
