(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('ResolutionsController', ['$scope',
                                            'ResolutionService',
                                            ResolutionsController]);

    function ResolutionsController($scope, ResolutionService) {
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

        /*================================
            Sorting Options
        ==================================*/
        $scope.sortOptions  = ['+title', '-title', '+expirationDate', '-expirationDate', '+startingDate', '-startingDate', '+type', '-type'];
        $scope.activeOpen   = true;
        $scope.archivedOpen = true;

        $scope.activeOpenClose   = function(){
            $scope.activeOpen = !$scope.activeOpen;
        };
        $scope.archivedOpenClose = function() {
            $scope.archivedOpen = !$scope.archivedOpen;
        };

        /*================================
            Tabs
        ==================================*/
        $scope.tabActive    = true;
        $scope.tabArchived  = false;
        $scope.changeTab    = function(){
            $scope.tabActive    = !$scope.tabActive;
            $scope.tabArchived = !$scope.tabArchived;
        };
    }
}());