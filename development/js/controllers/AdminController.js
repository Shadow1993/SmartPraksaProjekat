(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('AdminController', [AdminController]);

    function AdminController() {
        var vm = this;
        vm.test = 'test';
    }
}());