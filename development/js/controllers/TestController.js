(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('TestController', ['TestService', TestController]);

    function TestController(TestService) {
        var vm = this;
        vm.test = 'test';

        TestService.populate('users');
        TestService.populate('decisions');
    }
}());