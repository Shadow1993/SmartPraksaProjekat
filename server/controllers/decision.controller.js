'use strict';

/*
* GET DECISIONS ('/decisions', GET) => params = {}
* GET DECISION ('/decisions/:id', GET) => params = id
* CREATE DECISION ('/decisions', POST) => body = title, description, type, steps, startingDate, expirationDate
* RESTART DECISION ('/decisions', PUT) => body = id, title, description, type, steps, startingDate, expirationDate
*/

var DecisionModel = require('../models/decision.model');

module.exports.getAllDecisions = function (req, res) {
    DecisionModel.find({ active: ['Active', 'Expired'] })
        .populate(['comments', 'votes'])
        .exec(function (err, decisionDb) {
            if (err) {
                console.log(err.message);
                res.send({ message: 'error while retreiving all decisions from database' });
            } else {
                console.log(req.session);
                for (var i = 0; i < decisionDb.length; i++) {
                    if (decisionDb[i].expirationDate.getTime() < Date.now()) {
                        DecisionModel.findOneAndUpdate({ _id: decisionDb[i]._id }, { $set: { active: 'Expired' } }, function (err, data) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(data);
                            }
                        });
                    }
                }
                res.send(decisionDb);
            }
        });
};

module.exports.getDecisionById = function (req, res) {
    console.log(req.params);
    console.log('heeereeeee' + req.user);
    DecisionModel.findById({ _id: req.params.id })
        .populate(['comments', 'votes'])
        .exec(function (err, decisionDb) {
            if (err) {
                console.log(err.message);
                res.send({ message: 'error while retreiving decision from database' });
            } else {
                console.log(decisionDb);
                var countedVotes = {
                    for: 0,
                    reserved: 0,
                    against: 0
                };
                var userVoted = false;
                for (var i = 0; i < decisionDb.votes.length; i++) {
                    if (decisionDb.votes[i].submitedBy.equals(req.user._id.toString())) {
                        userVoted = true;
                    }
                    if (decisionDb.votes[i].type === 'For') {
                        countedVotes.for++;
                    } else if (decisionDb.votes[i].type === 'Against') {
                        countedVotes.against++;
                    } else if (decisionDb.votes[i].type === 'Reserved') {
                        countedVotes.reserved++;
                    }
                }
            }
            console.log(countedVotes);
            res.send({ decision: decisionDb, countedVotes: countedVotes, userVoted: userVoted });
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
            DecisionModel.findOneAndUpdate({ _id: req.body.id }, { $set: { active: 'Deactive' } }, function (err, decisionDb) {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    res.send(decisionDb);
                }
            });
        }
    });
};