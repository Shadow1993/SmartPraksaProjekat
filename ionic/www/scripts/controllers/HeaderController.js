(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('HeaderController', ['$ionicSideMenuDelegate', '$location', '$scope', HeaderController]);

    function HeaderController($ionicSideMenuDelegate, $location, $scope) {
        var vm = this;

        $scope.$watch(function () {
            return location.hash;
        }, function () {
            var title = $location.url();
            $scope.title = title.slice(1, title.length);
        });

        vm.toggleNavMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
    }
}());