(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('TestController', ['TestService', TestController]);

    function TestController(TestService) {
        var vm = this;
        vm.test = 'test';

        vm.populateUsers = function () {
            TestService.populate('users');
        };
        vm.populateDecisions = function () {
            TestService.populate('decisions');
        };
    }
}());