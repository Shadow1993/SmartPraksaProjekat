(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('ResolutionsController', [ResolutionsController]);

    function ResolutionsController() {
        var vm = this;
        vm.test = 'test';
    }
}());