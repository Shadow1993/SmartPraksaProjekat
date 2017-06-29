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

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
//Hash password before saving to db
userSchema.pre('save', function (next) {
    this.password = this.generateHash(this.password);
    next();
});

var UserModel = mongoose.model('User', userSchema);

function createAdminUser() {
    setTimeout(function () {
        //Create admin if users collection is empty
        UserModel.find({}, function (err, userData) {
            if (err) {
                console.log(err);
            } else if (userData == '') {
                Role.find({
                    title: 'Administrator'
                }, function (err, roleDb) {
                    if (err) {
                        console.log(err);
                    } else {
                        UserModel.create({
                            username: process.env.ADMINUSERNAME || 'admin',
                            password: process.env.ADMINPASSWORD || '123',
                            role: roleDb
                        }, function (err, userSaved) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(userSaved);
                            }
                        });
                    }
                });
            }
        });
    }, 1000)
}
createAdminUser();
module.exports = mongoose.model('User', userSchema);