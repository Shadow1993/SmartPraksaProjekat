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

        /*=======================
            Table Sorting
        =========================*/
        // Active Listing
        $scope.decisionsSorting = function(someArg, someState) {
            $scope.sortingArg   = someArg;
            $scope.sortingState = someState;
        };

        // Archived Listing
        $scope.decisionsSortingAr   = function(someArgAr, someStateAr) {
            $scope.sortingArgAr     = someArgAr;
            $scope.sortingStateAr   = someStateAr;
        };

        /*=======================
            Pagination
        =========================*/
        // Active
        $scope.paginationDecisionListing = {
            currentPage: 1,
            setPage: function (pageNo) {
                $scope.paginationDecisionListing.currentPage = pageNo;
            },
            maxSize: 10
        };
        // Archived
        $scope.paginationDecisionListingAr = {
            currentPage: 1,
            setPage: function (pageNoAr) {
                $scope.paginationDecisionListingAr.currentPage = pageNoAr;
            },
            maxSize: 10
        };
    }
}());