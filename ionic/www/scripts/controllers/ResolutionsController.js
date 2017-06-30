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
        vm.decisions = [];

        ResolutionService.getResolutions(2, 5)
            .then(function (res) {
                vm.resoultionsInfo = res;
                return res;
            })
            .then(function (res) {
                for (var obj = 0; obj <= res.length - 1; obj++) {
                    if (res[obj].active === 'Active') {
                        $scope.activeDecisions.push(res[obj]);
                    } else if (res[obj].active === 'Expired') {
                        $scope.archivedDecisions.push(res[obj]);
                    }
                }
            });

        /*===================================
            Infinite Scroll        
        ===================================== */
        var params = {
            offset: 0,
            limit: 5,
            active: 'active',
            archived: 'expired'
        };

        var spamprevent =  ['rip'];

        // Active Decisions
        $scope.loadMoreActiveDecisions = function() {
            if (spamprevent.length === 0) {
                return $scope.$broadcast('scroll.infiniteScrollComplete');
            }
            params.offset = vm.decisions.length;
            ResolutionService.getResolutions(params.offset, params.limit, params.active)
                .then(function (res) {
                    spamprevent = res;
                    vm.decisions = vm.decisions.concat(res);
                    for (var obj = 0; obj <= res.length - 1; obj++) {
                        if (res[obj].active === 'Active') {
                            $scope.activeDecisions.push(res[obj]);
                        }
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    return vm.decisions;
                })
                .catch(function (res) {
                    console.error(res);
                });
        };

        // Archived Decisions
        $scope.loadMoreArchivedDecisions = function() {
            if (spamprevent.length === 0) {
                return $scope.$broadcast('scroll.infiniteScrollComplete');
            }
            params.offset = vm.decisions.length;
            ResolutionService.getResolutions(params.offset, params.limit, params.archived)
                .then(function (res) {
                    spamprevent = res;
                    vm.decisions = vm.decisions.concat(res);
                    for (var obj = 0; obj <= res.length - 1; obj++) {
                        if (res[obj].active === 'Expired') {
                            $scope.archivedDecisions.push(res[obj]);
                        }
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    return vm.decisions;
                })
                .catch(function (res) {
                    console.error(res);
                });
        };

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