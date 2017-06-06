'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs');

var userSchema = new Schema({
    username: {
        type: String,
        required: 'Username field is required',
        unique: true,
        trim: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['Administrator', 'Viewer', 'Voter', 'Fasciliator'],
        default: 'Viewer'
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);