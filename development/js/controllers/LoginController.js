(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('LoginController', ['AuthorizeService', LoginController]);

    function LoginController(AuthorizeService) {
        var vm = this;

        vm.authorize = function(valid) {
            if (valid) {
                AuthorizeService.authorize(vm.user);
            } else {
                toastr.error('Error logging in..Please check the form for errors..');
            }
        };

        vm.user = {
            username: '',
            password: ''
        };

    }
}());