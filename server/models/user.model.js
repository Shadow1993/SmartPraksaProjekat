'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs'),
    Role = require('./role.model');

var userSchema = new Schema({
    username: {
        type: String,
        required: 'Username field is required!',
        unique: true,
        trim: true
    },
    dateCreated: {
        type: Date
    },
    password: {
        type: String,
        required: 'Password field is required'
    },
    role: [{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }]
});

module.exports = userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);