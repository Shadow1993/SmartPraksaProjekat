(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('ResolutionController', [ResolutionController]);

    function ResolutionController() {
        var vm = this;
        vm.test = 'test';

    }
}());