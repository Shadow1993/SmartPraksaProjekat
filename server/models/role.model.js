'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var roleSchema = new Schema({
    description: {
        type: String,
        required: 'Description field is required!'
    },
    title: {
        type: String,
        required: 'Title fiels is required!'
    }
});

module.exports = mongoose.model('Role', roleSchema);