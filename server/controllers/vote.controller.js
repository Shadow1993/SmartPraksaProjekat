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
<<<<<<< HEAD
                                    VoteModel.update({ _id: voteDb._id }, {
                                        $set:
                                        { comments: commentDb._id }
                                    },
                                        function (err, voteDb2) {
=======
                                    console.log('req. body.type' + req.body.type);
                                    if (voteDb.type === 'Against' || voteDb.type === 'Reserved') {
                                        console.log('hi im here: ' + req.body);
                                        if (req.body.commentText.match(/(\w+)/g).length < 5 && req.body.commentText.length < 20) {
                                            console.log('less than 5 words and less than 20 characters');
                                            res.send('less than 5 words and less than 20 characters');
                                        }
                                        CommentModel.create({
                                            text: req.body.commentText,
                                            submitedBy: req.body.submitedBy,
                                            submitedDate: req.body.submitedDate
                                        }, function (err, commentDb) {
>>>>>>> 54480b7eccbce8b1bd4fba55ea9ff49e161e6a97
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