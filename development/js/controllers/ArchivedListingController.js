(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('ArchivedListingController', [ArchivedListingController]);

    function ArchivedListingController() {
        var vm = this;
        vm.test = 'test';

    }
}());