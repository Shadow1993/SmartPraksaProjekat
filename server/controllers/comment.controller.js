'use strict';

var CommentModel = require('../models/comment.model'),
    DecisionModel = require('../models/decision.model');

module.exports.getAllComments = function(req, res) {
    console.log('hi' + req.params.id);
    DecisionModel
        .findOne({_id: req.params.id})
        .populate('comments')
        .exec(function(err, decisionDb) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log(decisionDb.comments);
                res.send(decisionDb.comments);
            }
        });
};

module.exports.createComment = function(req, res) {
    console.log(req.body.test);
/*
    CommentModel.create({
        text: req.body.text,
        submitedBy: req.body.submitedBy,
        submitedDate: Date.now()
    }, function(err, commentDb) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(commentDb);
            DecisionModel.update(
                {_id: req.body.decisionId},
                {
                    $push: {
                        comments: commentDb._id
                    }
                }, function(err, decisionDb) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    } else {
                        console.log(decisionDb);
                        res.send(decisionDb);
                    }
                });
        }
    });
    */
    res.send('pl');
};