(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('FacilitatorController', [FacilitatorController]);

    function FacilitatorController() {
        var vm = this;
        vm.test = 'test';

    }
}());