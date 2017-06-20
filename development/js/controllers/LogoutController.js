(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('LogoutController', ['AuthorizeService', LogoutController]);

    function LogoutController(AuthorizeService) {
        AuthorizeService.deauthorize();
    }
}());