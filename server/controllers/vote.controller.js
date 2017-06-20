'use strict';
var VoteModel = require('../models/vote.model'),
    CommentModel = require('../models/comment.model'),
    DecisionModel = require('../models/decision.model');

/*
* CREATE VOTE ('/votes', POST) => body = type, submitedDate, submitedBy, commentText, id - decision id
* EDIT VOTE ('/votes', PUT) => body =  type, submitedDate, submitedBy, commentText, id - vote id
*/

module.exports.createVote = function (req, res, next) {
    DecisionModel.findOne({ _id: req.body.id })
        .populate('votes')
        .exec(function (err, decisionDb) {
            if (err) {
                return next(err.message);
            } else {
                for (var i = 0; i < decisionDb.votes.length; i++) {
                    if (decisionDb.votes[i].submitedBy.equals(req.user._id.toString())) {
                        res.send('user already voted');
                    }
                }
                VoteModel.create({
                    type: req.body.type,
                    submitedDate: req.body.submitedDate,
                    submitedBy: req.body.submitedBy
                }, function (err, voteDb) {
                    if (err) {
                        return next(err.message);
                    } else {
                        DecisionModel.update(
                            { _id: req.body.id },
                            {
                                $push: {
                                    votes: voteDb._id
                                }
                            }, function (err, decisionDb) {
                                if (err) {
                                    return next(err.message);
                                } else {
                                    if (voteDb.type === 'Against' || voteDb.type === 'Reserved') {
                                        if (req.body.commentText.match(/(\w+)/g).length < 5 && req.body.commentText.length < 20) {
                                            console.log('less than 5 words and less than 20 characters');
                                            res.send('less than 5 words and less than 20 characters');
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
                                        console.log(voteDb);
                                        res.send(voteDb);
                                    }
                                }
                            }
                        );
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
                submitedBy: req.date.submitedBy
            }
        },
        function (err, voteDb) {
            if (err) {
                return next(err.message);
            } else {
                if (req.body.role === 'Against' || req.body.role === 'Reserved') {
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