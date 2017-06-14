(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('ResolutionsController', ['$scope',
                                             'ResolutionService',
                                             ResolutionsController]);

    function ResolutionsController($scope, ResolutionService) {
        var vm = this;
        vm.test = 'test';

        ResolutionService.getResolutions()
            .then(function (res) {
                console.log(res);
                vm.resoultionsInfo = res;
            });

    }
}());