'use strict';

module.exports.isLoggedIn = function (req, res, next) {
    console.log(req.user);
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
};

module.exports.isAdmin = function (req, res, next) {

};

