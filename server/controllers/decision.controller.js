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
                        DecisionModel.findOneAndUpdate({_id: decisionDb[i]._id}, {$set: {active: 'Expired'}}, function(err, data){
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
                for (var i = 0; i < decisionDb.votes.length; i++) {
                    console.log(decisionDb.votes[i]);
                    if (decisionDb.votes[i].type === 'For') {
                        countedVotes.for++;
                    } else if (decisionDb.votes[i].type === 'Against') {
                        countedVotes.against++;
                    } else if (decisionDb.votes[i].type === 'Reserved') {
                        countedVotes.reserved++;
                    }
                }
                if (decisionDb.expirationDate.getTime() < Date.now()) {
                    if (decisionDb.type === 'Simple Majority') {
                        
                    } else if (decisionDb.type === 'Unanimous') {

                    } else if (decisionDb.type === 'Super Majority') {

                    }
                /*
                provera da li je decision expired
                ako jeste count votes i setovati polje status na passed ili rejected
                */
                }
                console.log(countedVotes);
                res.send({decision: decisionDb, countedVotes: countedVotes});
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
            DecisionModel.findOneAndUpdate({_id: req.body.id}, {$set: {active: 'Deactive'}}, function(err, decisionDb) {
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