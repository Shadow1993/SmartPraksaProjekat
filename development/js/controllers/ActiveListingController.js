(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('ActiveListingController', ['UserService', ActiveListingController]);

    function ActiveListingController(UserService) {
        var vm = this;
        vm.test = 'test';

        var someData = {
            id: '5937faf5a667e5120403c8fd',
            newUsername: 'bla'
        };
        UserService.editUser(someData)
            .then(function() {
                console.log('nice');
            })
            .catch(function(res) {
                console.log(res);
                console.log('err');
            });
    }
}());