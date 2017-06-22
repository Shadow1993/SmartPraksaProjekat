'use strict';

/*
* GET ALL COMMENTS ('/comments', GET) => params = id
* CREATE COMMENT ('/comments'), POST) => body = id, text, submitedBy, submitedDate
*/

var CommentModel = require('../models/comment.model'),
    DecisionModel = require('../models/decision.model');

module.exports.getAllComments = function (req, res, next) {
    DecisionModel
        .findOne({ _id: req.params.id })
        .populate('comments')
        .exec(function (err, decisionDb) {
            if (err) {
                return next(err.message);
            } else {
                res.send(decisionDb.comments);
            }
        });
};

module.exports.createComment = function (req, res, next) {
    CommentModel.create({
        text: req.body.text,
        submitedBy: req.body.submitedBy,
        submitedDate: req.body.submitedDate
    }, function (err, commentDb) {
        if (err) {
            return next(err.message);
        } else {
            DecisionModel.update(
                { _id: req.body.id },
                {
                    $push: {
                        comments: commentDb._id
                    }
                }, function (err, decisionDb) {
                    if (err) {
                        return next(err.message);
                    } else {
                        res.send(decisionDb);
                    }
                });
        }
    });
};