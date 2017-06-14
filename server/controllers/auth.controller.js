'use strict';

module.exports.isLoggedIn = function (req, res, next) {
    console.log(req.user);
    if (req.user) {
        res.send('u ar ok');
    } else {
        res.send('u are not ok');
    }
};