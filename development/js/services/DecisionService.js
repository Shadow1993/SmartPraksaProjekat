(function () {
    'use strict';

    var app = angular.module('app');
    app.factory('DecisionService', ['$http', 'HandlingService', DecisionService]);

    function DecisionService($http, HandlingService) {

        var api = '/decisions';

        function getDecisions() {
            return $http({
                method: 'GET',
                url: api
            })
                .then(HandlingService.ReturnData)
                .catch(HandlingService.ReturnError);
        }
        function getDecision(id) {
            return $http({
                method: 'GET',
                url: api + '/' + id
            })
                .then(HandlingService.ReturnData)
                .catch(HandlingService.ReturnError);
        }
        function createDecision(data) {
            return $http({
                method: 'POST',
                url: api,
                data: data
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }
        function editDecision(data) {
            return $http({
                method: 'PUT',
                url: api,
                data: data
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }
        function deleteDecision(id) {
            return $http({
                method: 'DELETE',
                url: api + '/' + id
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }

        return {
            getDecisions: getDecisions,
            getDecision: getDecision,
            createDecision: createDecision,
            editDecision: editDecision,
            deleteDecision: deleteDecision
        };
    }
}());