(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('LoginController', ['AuthorizeService', 'NotificationService', LoginController]);

    function LoginController(AuthorizeService, NotificationService) {
        var vm = this;

        vm.authorize = function (valid) {
            if (valid) {
                AuthorizeService.authorize(vm.user)
                    .then(function() {
                        toastr.success(NotificationService.auth.success);
                    })
                    .catch(function () {
                        toastr.warning(NotificationService.auth.invalid);
                    });
            } else {
                toastr.error(NotificationService.validation.empty);
            }
        };

        vm.user = {
            username: '',
            password: ''
        };

    }
}());