'use strict';

/*
* GET DECISIONS ('/decisions', GET) => params = {}
* GET DECISION ('/decisions/:id', GET) => params = id
* CREATE DECISION ('/decisions', POST) => body = title, description, type, steps, startingDate, expirationDate
* RESTART DECISION ('/decisions', PUT) => body = id, title, description, type, steps, startingDate, expirationDate
*/

//return counted votes with get all decisions route - dodati polje u modelu! ...
//check if expired date and disallow voting
//validacija za vote za komentar
//za restartovanje decisiona: sacuvati prethodni i napraviti novi sa istim parametrima (drugaciji starting expiration date, type of voting is optional parameter)
//validacija za steps is not working , iskombinovati default vrednost i proveru za vrednosti izmedju 60 i 90 i zabrana (x != % 10)

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
                    console.log(decisionDb[i]);
                    decisionDb[i].checkIfExpired();
                }
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
            res.send({ message: 'error while retreiving decision from database' });
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
    console.log(req.body);
    //create new
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
            DecisionModel.findOneAndUpdate({_id: req.body.id}, {$set: {active: 'Deactive'}}, function(err, decisionDbRestarted) {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    decisionDbRestarted.restart();
                    res.send(decisionDb);
                }
            });
        }
    });
    //keep old in database, just change active filed to Deactive
};