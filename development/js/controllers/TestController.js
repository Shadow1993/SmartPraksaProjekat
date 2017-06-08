(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('TestController', ['UserService', TestController]);

    function TestController(UserService) {
        var vm = this;
        vm.test = 'test';
        var data = {
            username: 'hehh',
            password: '123',
            dateCreated: Date.now(),
            role: ['Viewer', 'Fasciliator']
        };
        UserService.createUser(data)
            .then(function(response) {
                console.log(response);
            });
    }
}());