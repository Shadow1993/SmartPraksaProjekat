'use strict';

/*
* GET DECISIONS ('/decisions', GET) => params = {}
* GET DECISION ('/decisions/:id', GET) => params = id
* CREATE DECISION ('/decisions', POST) => body = title, description, type, steps, startingDate, expirationDate
* RESTART DECISION ('/decisions', PUT) => body = id, title, description, type, steps, startingDate, expirationDate
*/

var DecisionModel = require('../models/decision.model');

module.exports.getAllDecisions = function (req, res, next) {
    DecisionModel.find({ active: ['Active', 'Expired'] })
        .populate(['comments', 'votes'])
        .exec(function (err, decisionDb) {
            if (err) {
                return next(err.message);
            } else {
                for (var i = 0; i < decisionDb.length; i++) {
                    if (decisionDb[i].expirationDate.getTime() < Date.now()) {
                        DecisionModel.findOneAndUpdate({ _id: decisionDb[i]._id }, { $set: { active: 'Expired' } },
                            function (err, data) {
                                if (err) {
                                    return next(err.message);
                                }
                            });
                    }
                }
                res.send(decisionDb);
            }
        });
};

module.exports.getDecisionById = function (req, res, next) {
    console.log(req.params);
    DecisionModel.findById({ _id: req.params.id })
        .populate(['comments', 'votes'])
        .exec(function (err, decisionDb) {
            if (err) {
                return next(err.message);
            } else {
                var countedVotes = {
                    agreed: 0,
                    reserved: 0,
                    against: 0
                };
                //Counting votes
                var userVoted = false;
                for (var i = 0; i < decisionDb.votes.length; i++) {
                    if (decisionDb.votes[i].submitedBy.equals(req.user._id.toString())) {
                        userVoted = true;
                    }
                    if (decisionDb.votes[i].type === 'For') {
                        countedVotes.agreed++;
                    } else if (decisionDb.votes[i].type === 'Against') {
                        countedVotes.against++;
                    } else if (decisionDb.votes[i].type === 'Reserved') {
                        countedVotes.reserved++;
                    }
                }
                //Checking if decision expired
                var passed = false;
                if (decisionDb.active === 'Expired') {
                    if (decisionDb.type === 'Simple Majority' && countedVotes.against !== 0) {
                        if (Math.round(countedVotes.agreed / countedVotes.against) > 60) {
                            passed = true;
                        }
                    } else if (decisionDb.type === 'Unanimous') {
                        if (countedVotes.against === 0 && countedVotes.agreed > 0) {
                            passed = true;
                        }
                    } else if (decisionDb.type === 'Super Majority' && countedVotes.against !== 0) {
                        if (Math.round(countedVotes.agreed / countedVotes.against) > decisionDb.steps) {
                            passed = true;
                        }
                    } else if (countedVotes.agreed > 0 && countedVotes.against === 0) {
                        passed = true;
                    }
                }
                res.send({ decision: decisionDb, countedVotes: countedVotes, userVoted: userVoted, passed: passed });
            }
        });
};

function countVotes(decisionsParam) {
    var retVal = {
        userVoted: false,
        countedVotes: {
            agreed: 0,
            against: 0,
            reserved: 0
        }
    };

    return retVal;
}

function checkIfExpired() {

    return passed;
}



module.exports.createDecision = function (req, res, next) {
    DecisionModel.create({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        steps: req.body.steps,
        startingDate: req.body.startingDate,
        expirationDate: req.body.expirationDate
    }, function (err, decisionDb) {
        if (err) {
            return next(err.message);
        } else {
            res.send(decisionDb);
        }
    });
};

module.exports.restartDecision = function (req, res, next) {
    console.log(new Date(req.body.expirationDate) - new Date(req.body.startingDate));
    DecisionModel.create({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        steps: req.body.steps,
        startingDate: Date.now(),
        expirationDate: (new Date(req.body.expirationDate) - new Date(req.body.startingDate)) + Date.now()
    }, function (err, decisionDb) {
        if (err) {
            return next(err.message);
        } else {
            console.log(decisionDb);
            DecisionModel.findOneAndUpdate({ _id: req.body._id }, { $set: { active: 'Deactive' } },
                function (err, decisionDb2) {
                    if (err) {
                        return next(err.message);
                    } else {
                        console.log('ASAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + decisionDb2);
                        res.send(decisionDb2);
                    }
                });
        }
    });
};