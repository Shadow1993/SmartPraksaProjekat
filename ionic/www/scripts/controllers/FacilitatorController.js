(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('FacilitatorController', ['ResolutionService',
        '$uibModal',
        '$state',
        '$ionicScrollDelegate',
        FacilitatorController]);

    function FacilitatorController(ResolutionService, $uibModal, $state, $ionicScrollDelegate) {

        var vm = this;

        ResolutionService.getResolutions()
            .then(function (res) {
                console.log(res);
                vm.resolutions = res;
            })
            .catch(function (res) {
                console.log(res);
                toastr.error();
            });

        // Was calculating expire/active

        // vm.decisionStatus = function (startingDate, expirationDate) {
        //     if (Date.parse(expirationDate) - Date.now() >= 0) {
        //         return 'Active';
        //     } else {
        //         return 'Expired';
        //     }
        // };

        // Reactivate decision
        vm.reactivateDecision = function (data) {
            ResolutionService.editResolution(data)
                .then(function () {
                    $state.reload();
                });
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

        // vm.scrollTop = function () {
        //     $ionicScrollDelegate.scrollTop();
        // };
    }
}());