(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('DecisionController', [DecisionController]);

    function DecisionController() {
        var vm = this;
        vm.test = 'test';

    }
}());