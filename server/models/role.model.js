'use strict';

var mongoose = require('mongoose'),
    seedRoleData = require('./seed.role.model'),
    UserModel = require('./user.model'),
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

var RoleModel = mongoose.model('Role', roleSchema);

// Seeding role model
RoleModel.find({}, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        if (data == '') {
            console.log('ok');
            for (var i = 0; i < seedRoleData.roles.length; i++) {
                seed(seedRoleData.roles[i]);
            }
        }
    }
});

function seed(data) {
    console.log(data);
    RoleModel.create({
        title: data.title,
        description: data.description
    }, function (err, roleDb) {
        if (err) {
            console.log(err);
        } else {
            console.log(roleDb);
        }
    });
}

module.exports = mongoose.model('Role', roleSchema);