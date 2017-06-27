(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('FooterController', ['$ionicScrollDelegate', FooterController]);

    function FooterController($ionicScrollDelegate) {
        var vm = this;

        vm.scrollTop = function () {
            $ionicScrollDelegate.scrollTop();
        };
    }


}());