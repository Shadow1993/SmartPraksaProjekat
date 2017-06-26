(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('LogoutController', ['AuthorizeService', 'NotificationService', LogoutController]);

    function LogoutController(AuthorizeService, NotificationService) {
        AuthorizeService.deauthorize()
            .then(function() {
                toastr.info(NotificationService.auth.logout);
            });
    }
}());