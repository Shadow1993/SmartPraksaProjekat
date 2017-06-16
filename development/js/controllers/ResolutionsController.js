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
                //console.log(res);
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

        /*=======================
            Pagination
        =========================*/
        $scope.viewby = 3;
        $scope.currentPageActive = 4;
        $scope.currentPageArchived = 4;
        $scope.itemsPerPage = $scope.viewby;
        $scope.maxSize = 5; //Number of pager buttons to show

        $scope.setPage = function (pageNo) {
            $scope.currentPageActive = pageNo;
            $scope.currentPageArchived = pageNo;
        };

        $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.currentPageActive);
            console.log('Page changed to: ' + $scope.currentPageArchived);
        };

        $scope.setItemsPerPage = function(num) {
            $scope.itemsPerPage = num;
            $scope.currentPageActive = 1; //reset to first paghe
            $scope.currentPageArchived = 1; //reset to first paghe
        };
    }
}());