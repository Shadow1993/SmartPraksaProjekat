(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('HeaderController', HeaderController);

    function HeaderController() {
        var vm = this;
        vm.test = 'test';

    }
}());