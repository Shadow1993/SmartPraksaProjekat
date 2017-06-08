(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('ActiveListingController', ['UserService', ActiveListingController]);

    function ActiveListingController(UserService) {
        var vm = this;
        vm.test = 'test';

        var someData = {
            id: '5937b3ae2f35c86fe7fff0e3',
            newUsername: 'yeeee'
        };
        UserService.getUser(someData.id)
            .then(function(res) {
                console.log('nice');
                console.log(res);
            })
            .catch(function(res) {
                console.log(res);
                console.log('err');
            });
    }
}());