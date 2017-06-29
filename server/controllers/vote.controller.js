'use strict';
var VoteModel = require('../models/vote.model'),
    CommentModel = require('../models/comment.model'),
    DecisionModel = require('../models/decision.model');

/*
* CREATE VOTE ('/votes', POST) => body = type, submitedDate, submitedBy, commentText, id - decision id
* EDIT VOTE ('/votes', PUT) => body =  type, submitedDate, submitedBy, commentText, id - vote id
*/

module.exports.createVote = function (req, res, next) {
    VoteModel.create({
        type: req.body.type,
        submitedBy: req.body.submitedBy,
        submitedDate: req.body.submitedDate
    }, function (err, voteDb) {
        if (err) {
            return next(err.message);
        } else {
            DecisionModel.update({ _id: req.body.id }, { $push: { votes: voteDb._id } },
                function (err) {
                    if (err) {
                        return next(err.message);
                    } else {
                        if (req.body.type === 'Against' || req.body.type === 'Reserved') {
                            if (req.body.commentText === '' || req.body.commentText === undefined) {
                                res.status(418).send('failed at validating comment text');
                            }
                            CommentModel.create({
                                text: req.body.commentText,
                                submitedBy: req.body.submitedBy,
                                submitedDate: req.body.submitedDate
                            }, function (err, commentDb) {
                                if (err) {
                                    return next(err.message);
                                } else {
                                    VoteModel.update({ _id: voteDb._id }, {
                                        $set:
                                        { comments: commentDb._id }
                                    },
                                        function (err, voteDb2) {
                                            if (err) {
                                                return next(err.message);
                                            } else {
                                                console.log(voteDb2);
                                                res.send(voteDb2);
                                            }
                                        });
                                }
                            });
                        } else {
                            res.send(voteDb);
                        }
                    }
                });
        }
    });
};

module.exports.editVote = function (req, res, next) {
    VoteModel.findByIdAndUpdate({ _id: req.body.id },
        {
            $set: {
                type: req.body.type,
                submitedDate: req.body.submitedDate,
                submitedBy: req.body.submitedBy
            }
        },
        function (err, voteDb) {
            if (err) {
                return next(err.message);
            } else {
                if (req.body.type === 'Against' || req.body.type === 'Reserved') {
                    CommentModel.create({
                        text: req.body.commentText,
                        submitedBy: req.body.submitedBy,
                        submitedDate: req.body.submitedDate
                    }, function (err, commentDb) {
                        if (err) {
                            return next(err.message);
                        } else {
                            VoteModel.update({ _id: voteDb._id }, { $set: { comments: commentDb._id } },
                                function (err, voteDb) {
                                    if (err) {
                                        return next(err.message);
                                    } else {
                                        res.send(voteDb);
                                    }
                                });
                        }
                    });
                } else {
                    res.send(voteDb);
                }
            }
        });
};