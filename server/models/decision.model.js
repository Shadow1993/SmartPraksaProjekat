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
        default: 60,
        validate: {
            validator: validateSteps,
            message: 'steps field must be one of the following: 60, 70, 80, 90.'
        },
        required: true
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

function validateSteps(step) {
    return step % 10 === 0 ? true : false;
};

decisionSchema.methods.checkIfExpired = function () {
    if (Date.now() > this.expirationDate.getTime()) {
        this.active = 'Expired';
    }
};

module.exports = mongoose.model('Decision', decisionSchema);