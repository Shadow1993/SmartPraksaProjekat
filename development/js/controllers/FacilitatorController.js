(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('FacilitatorController', ['ResolutionService', '$uibModal', '$state', FacilitatorController]);

    function FacilitatorController(ResolutionService, $uibModal, $state) {

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

        vm.decisionStatus = function (startingDate, expirationDate) {
            if (Date.parse(expirationDate) - Date.now() >= 0) {
                return 'Pending';
            } else {
                return 'Expired';
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
    }
}());