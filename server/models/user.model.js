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
        type: Date,
        default: Date.now()
    },
    password: {
        type: String,
        required: 'Password field is required'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: [{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }]
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.getRole = function() {
    Role.find({_id: this.role}, function(err, roleDb) {
        if (err) {
            console.log(err);
        } else {
            console.log('asaaaa' + roleDb);
            return roleDb;
        }
    });
};

userSchema.pre('save', function(next) {
    this.password = this.generateHash(this.password);
    next();
});

module.exports = mongoose.model('User', userSchema);