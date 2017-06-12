'use strict';
var VoteModel = require('../models/vote.model'),
    CommentModel = require('../models/comment.model'),
    DecisionModel = require('../models/decision.model');


/*
* CREATE VOTE ('/votes', POST) => body = type, submitedDate, submitedBy, commentText, id - decision id
* EDIT VOTE ('/votes', PUT) => body =  type, submitedDate, submitedBy, commentText, id - vote id
*/

module.exports.createVote = function (req, res) {
    console.log(req.body);
    VoteModel.create({
        type: req.body.type,
        submitedDate: req.body.submitedDate,
        submitedBy: req.body.submitedBy
    }, function (err, voteDb) {
        if (err) {
            console.log(err);
            res.send(err.message);
        } else {
            console.log(voteDb);
            DecisionModel.update(
                { _id: req.body.id },
                {
                    $push: {
                        votes: voteDb._id
                    }
                }, function (err, decisionDb) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(decisionDb);
                        if (voteDb.type == 'Against' || voteDb.type == 'Reserved') {
                            CommentModel.create({
                                text: req.body.commentText,
                                submitedBy: req.body.submitedBy,
                                submitedDate: req.body.submitedDate
                            }, function (err, commentDb) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(commentDb);
                                    VoteModel.update({ _id: voteDb._id }, { $set: { comments: commentDb._id } },
                                        function (err, voteDb2) {
                                            if (err) {
                                                console.log(err);
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
};

module.exports.editVote = function (req, res) {
    console.log(req.body);
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
                console.log(err);
                res.send(err);
            } else {
                console.log(voteDb);
                if (req.body.role == 'Against' || req.body.role == 'Reserved') {
                    CommentModel.create({
                        text: req.body.commentText,
                        submitedBy: req.body.submitedBy,
                        submitedDate: req.body.submitedDate
                    }, function (err, commentDb) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(commentDb);
                            res.send(commentDb);
                            VoteModel.update({ _id: voteDb._id }, { $set: { comments: commentDb._id } },
                                function (err, voteDb) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log(voteDb);
                                        res.send(voteDb);
                                    }
                                });
                        }
                    });
                } else {
                    console.log(voteDb);
                    res.send(voteDb);
                }
            }
        });
};