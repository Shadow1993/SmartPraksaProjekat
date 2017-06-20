'use strict';

var mongoose = require('mongoose');

module.exports = function (config) {
    mongoose.connect(config.dbUrl, function (err) {
        if (err) {
            console.log('Could not connect to MongoDB. Did you forget to run `mongod`?');
        }
        var db = mongoose.connection;
        db.once('open', function callback() {
            console.log('Connected to database on address: "mongodb://localhost/test"');
        });
    });
};