'use strict';
var VoteModel = require('../models/vote.model'), 
    CommentModel = require('../models/comment.model');

module.exports.createVote = function(req, res) {
    console.log('hhiihih');
    console.log(req.body.username);

    VoteModel.create({
        type: req.body.type,
        dateSubmited: Date.now(),
        submitedBy: '59394167d329b837e8e43251'
    }, function(err, voteDb) {
        if (err) {
            console.log(err);
        } else {
            console.log(voteDb);
            if (voteDb.type == 'Against' || voteDb.type == 'Reserved') {
                CommentModel.create({
                    text: 'jer moze hc sadsadadspls?',
                    submitedBy: '59394167d329b837e8e43251',
                    dateSubmited: Date.now()
                }, function(err, commentDb) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(commentDb);
                        VoteModel.update({_id: voteDb._id}, {$set: {comments: commentDb._id}}, 
                        function(err, voteDb2) {
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
                res.send(voteDb);
            }
        }
    });

};

module.exports.editVote = function (req, res) {
    //TODO BONUS UPDATE VOTE DECISION
};
