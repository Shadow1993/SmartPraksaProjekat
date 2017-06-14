'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Comment = require('./comment.model'),
    Vote = require('./vote.model');

var decisionSchema = new Schema({
    title: {
        type: String,
        required: 'Title field is required!',
        trim: true
    },
    description: {
        type: String,
        required: 'Description field is required!',
        trim: true
    },
    type: {
        type: String,
        enum: ['Simple Majority', 'Unanimous', 'Super Majority'],
        default: 'Simple Majority'
    },
    steps: {
        type: Number,
        min: 60,
        max: 90,
        default: 60
    },
    startingDate: {
        type: Date,
        default: Date.now()
    },
    expirationDate: {
        type: Date,
        required: 'Expiration date field is required!'
    },
    active: {
        type: String,
        enum: ['Active', 'Expired', 'Deactive'],
        default: 'Active'
    },
    comments: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    },
    votes: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Vote'
        }]
    }
});

decisionSchema.methods.checkIfExpired = function () {
    if (this.expirationDate.getTime() == this.startingDate.getTime()) {
        this.active = 'Expired';
    }
};

decisionSchema.methods.checkIfVoted = function (userId) {
    if (this.votes.indexOf(userId) > -1) {
        return true;
    } else {
        return false;
    }
};

module.exports = mongoose.model('Decision', decisionSchema);