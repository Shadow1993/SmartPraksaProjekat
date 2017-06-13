(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('FacilitatorController', ['$scope', 'ResolutionService', '$uibModal', FacilitatorController]);

    function FacilitatorController($scope, ResolutionService, $uibModal) {

        ResolutionService.getResolutions()
            .then(function (res) {
                console.log(res);
                $scope.resolutions = res;
            })
            .catch(function (res) {
                console.log(res);
                toastr.error();
            });

        $scope.decisionStatus = function (startingDate, expirationDate) {
            if (Date.parse(expirationDate) - Date.now() >= 0) {
                return 'Pending';
            } else {
                return 'Expired';
            }

        };
        // Modal window
        $scope.addDecision = function () {
            $scope.modalAddDecision = $uibModal.open({
                templateUrl: '../templates/facilitatorForm.html',
                controller: 'FacilitatorFormController'
            });
        };
    }
}());