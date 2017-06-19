'use strict';

/*
* GET ALL COMMENTS ('/comments', GET) => params = id
* CREATE COMMENT ('/comments'), POST) => body = id, text, submitedBy, submitedDate
*/

var CommentModel = require('../models/comment.model'),
    DecisionModel = require('../models/decision.model');

module.exports.getAllComments = function (req, res) {
    console.log(req.params);
    DecisionModel
        .findOne({ _id: req.params.id })
        .populate('comments')
        .exec(function (err, decisionDb) {
            if (err) {
                console.log(err.message);
                res.send({ message: 'error while retreiving all comments from database' });
            } else {
                console.log(decisionDb.comments);
                res.send(decisionDb.comments);
            }
        });
};

module.exports.createComment = function (req, res) {
    console.log(req.body);
    CommentModel.create({
        text: req.body.text,
        submitedBy: req.body.submitedBy,
        submitedDate: req.body.submitedDate
    }, function (err, commentDb) {
        if (err) {
            console.log(err.message);
            res.send({ message: 'error while creating new comment' });
        } else {
            console.log(commentDb);
            DecisionModel.update(
                { _id: req.body.id },
                {
                    $push: {
                        comments: commentDb._id
                    }
                }, function (err, decisionDb) {
                    if (err) {
                        console.log(err.message);
                        res.send({ message: 'error while saving comment into decision' });
                    } else {
                        console.log(decisionDb);
                        res.send(decisionDb);
                    }
                });
        }
    });
};