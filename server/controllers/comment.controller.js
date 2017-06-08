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
    console.log(req);

/*
    CommentModel.create({
        text: 'hardcoded',
        submitedBy: '59392b8675479904c4ba3863',
        submitedDate: Date.now()
    }, function(err, commentDb) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(commentDb);
            DecisionModel.update(
                {_id: '5937eb776ed2c928b0a07288'},
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
    res.send('ok');
};

module.exports.editComment = function(req, res) {
    console.log('assasa');
    console.log(req.body.test);
    //CommentModel.findByIdAndUpdate({id: req.body.id}, )
    res.send('sasa');
};