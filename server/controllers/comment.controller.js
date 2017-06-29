'use strict';

/*
* GET ALL COMMENTS ('/comments', GET) => params = id
* CREATE COMMENT ('/comments'), POST) => body = id, text, submitedBy, submitedDate
*/

var CommentModel = require('../models/comment.model'),
    UserModel = require('../models/user.model'),
    DecisionModel = require('../models/decision.model');

module.exports.getAllComments = function (req, res, next) {
    var limit = parseInt(req.query.limit),
        offset = parseInt(req.query.offset),
        checkIfNum = /^\d+$/;
    if (limit === 0 && offset === 0) {
        DecisionModel
            .findOne({ _id: req.params.id })
            .populate('comments')
            .exec(function (err, decisionDb) {
                if (err) {
                    return next(err);
                } else {
                    // get all comments and their users
                    res.send(decisionDb.comments);
                }
            });
    } else if (!checkIfNum.test(limit) || !checkIfNum.test(offset) || limit < 0 || offset < 0) {
        res.status(418).send('wrong parameters');
    } else {
        DecisionModel
            .findOne({ _id: req.params.id })
            .skip(offset).limit(limit)
            .populate('comments')
            .exec(function (err, decisionDb) {
                if (err) {
                    return next(err);
                } else {
                    // get all comments and their users
                    res.send(decisionDb.comments);
                }
            });
    }
};
module.exports.createComment = function (req, res, next) {
    CommentModel.create({
        text: req.body.text,
        submitedBy: req.body.submitedBy,
        submitedDate: req.body.submitedDate
    }, function (err, commentDb) {
        if (err) {
            return next(err);
        } else {
            DecisionModel.update(
                { _id: req.body.id },
                {
                    $push: {
                        comments: commentDb._id
                    }
                }, function (err, decisionDb) {
                    if (err) {
                        return next(err);
                    } else {
                        res.send(decisionDb);
                    }
                });
        }
    });
};