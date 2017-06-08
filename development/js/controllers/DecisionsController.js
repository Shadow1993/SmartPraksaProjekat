(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('DecisionsController', [DecisionsController]);

    function DecisionsController() {
        var vm = this;
        vm.test = 'test';
    }
}());