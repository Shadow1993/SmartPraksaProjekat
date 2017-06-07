'use strict';

var mongoose = require('mongoose');

module.exports = function(config) {
    mongoose.connect(config.dbUrl, function(err) {
        if (err) {
            console.log(err);
        }
        var db = mongoose.connection;
        db.once('open', function callback() {
            console.log('Connected to database on address: "mongodb://localhost/SmartProjekatPraksaDb"');
        });
    });
};