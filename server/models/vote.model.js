'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./user.model'),
    Comment = require('./comment.model');

var voteSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['Against', 'Reserved', 'For'],
        default: 'Agreed'
    },
    submitedDate: {
        type: Date,
        default: Date.now(),
        required: true
    },
    submitedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    }]
});

module.exports = mongoose.model('Vote', voteSchema);