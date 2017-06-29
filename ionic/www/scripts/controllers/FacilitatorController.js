(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('FacilitatorController', ['ResolutionService',
        '$uibModal',
        '$state',
        '$scope',
        FacilitatorController]);

    function FacilitatorController(ResolutionService, $uibModal, $state, $scope) {

        var vm = this;
        vm.resolutions = [];

        var params = {
            offset: 0,
            limit: 5
        };

        $scope.loadMore = function() {
            params.offset = vm.resolutions.length;
            ResolutionService.getResolutions(params.offset, params.limit)
                .then(function (res) {
                    vm.resolutions = vm.resolutions.concat(res);
                })
                .catch(function (res) {
                    console.error(res);
                });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        // Reactivate decision

        vm.reactivateDecision = function (data) {
            if (data.active === 'Active') {
                toastr.warning('Cannot reactivate an ongoing decision');
            } else if (data.active === 'Expired') {
                ResolutionService.editResolution(data)
                    .then(function () {
                        $state.reload();
                    });
            } else {
                console.error('Cannot reactivate decision');
                console.error(data);
            }
        };

        // Modal window
        vm.addDecision = function () {
            vm.modalAddDecision = $uibModal.open({
                templateUrl: '../templates/facilitatorForm.html',
                controller: 'FacilitatorFormController',
                controllerAs: 'ffc'
            }).result
                .then(function () {
                    $state.reload();
                })
                .catch(function (res) {
                    if (!(res === 'cancel' || res === 'escape key press' || res === 'backdrop click')) {
                        throw res;
                    }
                });
        };

        vm.dateReform = function (date) {
            var dateReform = new Date(date);
            return dateReform.toUTCString();
        };

        vm.pagination = {
            currentPage: 1,

            setPage: function (pageNo) {
                vm.pagination.currentPage = pageNo;
            },
            maxSize: 5
        };

        vm.sortOptions = [' ', '+title', '-title', '+expirationDate', '-expirationDate',
            '+startingDate', '-startingDate', '+type', '-type'];
    }
}());