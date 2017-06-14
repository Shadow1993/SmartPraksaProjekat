(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('LoginController', ['AuthorizeService', LoginController]);

    function LoginController(AuthorizeService) {
        var vm = this;
        vm.test = 'test';

        vm.authorize = function() {
            console.log(vm.user);
            AuthorizeService.authorize(vm.user)
                .then(function(res) {
                    console.log(res);
                })
                .catch(function(res) {
                    throw res;
                });
        };

        vm.user = {
            username: '',
            password: ''
        };

    }
}());