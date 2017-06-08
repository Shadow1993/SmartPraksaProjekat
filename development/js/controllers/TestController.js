(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('TestController', [TestController]);

    function TestController() {
        var vm = this;
        vm.test = 'test';

    }
}());