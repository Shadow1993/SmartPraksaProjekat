(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('ResolutionsController', ['ResolutionService', ResolutionsController]);

    function ResolutionsController(ResolutionService) {
        var vm = this;
        vm.test = 'test';

        ResolutionService.getResolutions()
            .then(function (res) {
                console.log(res);
                vm.resoultionsInfo = res;
            })
    }
}());