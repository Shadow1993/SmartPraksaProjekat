'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./user.model');

var commentSchema = new Schema({
    text: {
        type: String,
        required: 'Text field is required',
        trim: true
    },
    submitedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    submitedDate: {
        type: Date,
        default: Date.now(),
        required: 'Date of posting comment is required'
    }
});

module.exports = mongoose.model('Comment', commentSchema);
