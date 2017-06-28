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
                    checkIfExpired(decisionDb[i]);
                }
                res.send(decisionDb);
            }
        });
};

// ! helper function for checking if decision has expired
function checkIfExpired(data) {
    if (data.expirationDate.getTime() < Date.now()) {
        DecisionModel.findOneAndUpdate({ _id: data._id }, { $set: { active: 'Expired' } });
    }
}

module.exports.getDecisionById = function (req, res, next) {
    console.log(req.params);
    DecisionModel.findById({ _id: req.params.id })
        .populate(['comments', 'votes'])
        .exec(function (err, decisionDb) {
            if (err) {
                return next(err.message);
            } else {
                var userSubmited = req.user._id.toString();
                var countedVotes = countVotes(decisionDb, userSubmited);
                console.log(countedVotes);
                res.send({ decision: decisionDb, countedVotes: countedVotes.countedVotes, userVoted: countedVotes.userVoted, passed: countedVotes.passed });
            }
        });
};
// ! helper function for counting votes, checking if user already voted and checking if decision has expired
function countVotes(data, userSubmited) {
    var retVal = {
        countedVotes: {
            agreed: 0,
            reserved: 0,
            against: 0
        },
        userVoted: false,
        passed: false
    };
    // check if user voted and count votes
    for (var i = 0; i < data.votes.length; i++) {
        if (data.votes[i].submitedBy.equals(userSubmited)) {
            retVal.userVoted = true;
        }
        if (data.votes[i].type === 'For') {
            retVal.countedVotes.agreed++;
        } else if (data.votes[i].type === 'Against') {
            retVal.countedVotes.against++;
        } else if (data.votes[i].type === 'Reserved') {
            retVal.countedVotes.reserved++;
        }
    }
    // check if decision passed or rejected
    if (data.active === 'Expired') {
        if (data.type === 'Simple Majority' && retVal.countedVotes.against !== 0) {
            if (Math.round(retVal.countedVotes.agreed / retVal.countedVotes.against) > 60) {
                retVal.passed = true;
            }
        } else if (data.type === 'Unanimous') {
            if (retVal.countedVotes.against === 0 && retVal.countedVotes.agreed > 0) {
                retVal.passed = true;
            }
        } else if (data.type === 'Super Majority' && retVal.countedVotes.against !== 0) {
            if (Math.round(retVal.countedVotes.agreed / retVal.countedVotes.against) > data.steps) {
                retVal.passed = true;
            }
        } else if (retVal.countedVotes.agreed > 0 && retVal.countedVotes.against === 0) {
            retVal.passed = true;
        }
    }
    return retVal;
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
                        res.send(decisionDb2);
                    }
                });
        }
    });
};