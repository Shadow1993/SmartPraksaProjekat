(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('ActiveListingController', [ActiveListingController]);

    function ActiveListingController() {
        var vm = this;
        vm.test = 'test';
    }
}());