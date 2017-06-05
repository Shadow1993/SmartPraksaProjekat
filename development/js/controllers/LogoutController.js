(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('LogoutController', LogoutController);

    function LogoutController() {
        var vm = this;
        vm.test = 'test';

    }
}());