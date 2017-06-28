(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('ResolutionsController', ['$scope',
                                            'ResolutionService',
                                            '$ionicScrollDelegate',
                                            ResolutionsController]);

    function ResolutionsController($scope, ResolutionService, $ionicScrollDelegate) {
        var vm = this;
        vm.test = 'test';

        $scope.activeDecisions   = [];
        $scope.archivedDecisions = [];

        ResolutionService.getResolutions()
            .then(function (res) {
                vm.resoultionsInfo = res;
                return res;
            }).then(function (res) {
                for (var obj = 0; obj <= res.length - 1; obj++) {
                    if (res[obj].active === 'Active') {
                        $scope.activeDecisions.push(res[obj]);
                    } else if (res[obj].active === 'Expired') {
                        $scope.archivedDecisions.push(res[obj]);
                    }
                }
            });

        // Show/hide scroll to top button
        $scope.showHideBtn  = '';
        $scope.scrollPosition = function() {
            $scope.scrollC = $ionicScrollDelegate.getScrollPosition().top;
            if ($scope.scrollC > 250) {
                $scope.showHideBtn = 'visible';
                console.log($scope.showHideBtn);
            } else {
                $scope.showHideBtn = 'not-visible';
                console.log($scope.showHideBtn);
            }
        };
    }
}());