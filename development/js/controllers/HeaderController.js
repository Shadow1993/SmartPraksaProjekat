(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('HeaderController', ['AuthorizeService', HeaderController]);

    function HeaderController(AuthorizeService) {
        var vm = this;
        vm.test = 'test';

        console.log(AuthorizeService.isAuthorized());
    }
}());