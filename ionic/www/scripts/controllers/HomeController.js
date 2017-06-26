(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('HomeController', ['AuthorizeService', '$ionicSideMenuDelegate', HomeController]);

    function HomeController(AuthorizeService, $ionicSideMenuDelegate) {
        var vm = this;

        vm.toggleNavMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        AuthorizeService.checkAuthentication()
            .then(function () {
                vm.user = AuthorizeService.getUser();
                vm.permission = function (role) {
                    for (var i in vm.user.role) {
                        if (vm.user.role[i] === role) {
                            return true;
                        }
                    }
                    return false;
                };
            });
    }
}());