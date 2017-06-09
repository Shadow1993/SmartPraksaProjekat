(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('ResolutionController', ['ResolutionService', '$stateParams', ResolutionController]);

    function ResolutionController(ResolutionService, $stateParams) {
        var vm = this;
        vm.test = 'test';

        ResolutionService.getResolution($stateParams.id)
            .then(function (res) {
                console.log($stateParams.id);
                vm.resoultionInfo = res;
            })

    }
}());