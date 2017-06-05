(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('LoginController', [LoginController]);

    function LoginController() {
        var vm = this;
        vm.test = 'test';

        vm.user = {
            name: '',
            password: ''
        };

    }
}());