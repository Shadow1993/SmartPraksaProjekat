(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('MainController', MainController);

    function MainController() {
        var vm = this;
        vm.test = 'test';

    }
}());