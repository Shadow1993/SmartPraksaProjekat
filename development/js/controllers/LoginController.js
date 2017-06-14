(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('LoginController', ['AuthorizeService', LoginController]);

    function LoginController(AuthorizeService) {
        var vm = this;
        vm.test = 'test';

        vm.authorize = function(valid) {
            if (valid) {
                AuthorizeService.authorize(vm.user)
                    .then(function() {
                        toastr.success('Logged in..');
                    })
                    .catch(function(res) {
                        throw res;
                    });
            } else {
                toastr.error('Error logging in..');
            }
        };

        vm.user = {
            username: '',
            password: ''
        };

    }
}());