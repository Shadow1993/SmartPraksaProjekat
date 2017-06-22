'use strict';

var LocalStrategy = require('passport-local').Strategy,
    UserModel = require('../models/user.model');

//passport configuration, local-strategy
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        UserModel.findById(id, function(err, user) {
            done(err, user);
        });
    });
    passport.use('local-login', new LocalStrategy({
        passReqToCallback: true
    },
    function(req, username, password, done) {
        UserModel.findOne({username: username}, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Incorrect username!'});
            }
            if (!user.validPassword(password)) {
                return done(null, false, {message: 'Incorrect password!'});
            }
            return done(null, user);
        });
    }));
};