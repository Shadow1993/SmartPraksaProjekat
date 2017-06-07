(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('ActiveListingController', ['UserService', ActiveListingController]);

    function ActiveListingController(UserService) {
        var vm = this;
        vm.test = 'test';

        var someData = {
            username: 'asdf',
            password: 'testasdfasdfing'
        };
        UserService.createUser(someData)
            .then(function() {
                console.log('nice');
            })
            .catch(function(res) {
                console.log(res);
                console.log('err');
            });
    }
}());