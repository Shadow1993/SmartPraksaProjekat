(function () {
    'use strict';

    var app = angular.module('app');
    app.factory('ResolutionService', ['$http', 'HandlingService', ResolutionService]);

    function ResolutionService($http, HandlingService) {

        var api = '/decisions';

        function getResolutions() {
            return $http({
                method: 'GET',
                url: api
            })
                .then(HandlingService.ReturnData)
                .catch(HandlingService.ReturnError);
        }
        function getResolution(id) {
            return $http({
                method: 'GET',
                url: api + '/' + id
            })
                .then(HandlingService.ReturnData)
                .catch(HandlingService.ReturnError);
        }
        function createResolution(data) {
            return $http({
                method: 'POST',
                url: api,
                data: data
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }
        function editResolution(data) {
            return $http({
                method: 'PUT',
                url: api,
                data: data
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }
        function deleteResolution(id) {
            return $http({
                method: 'DELETE',
                url: api + '/' + id
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }

        return {
            getResolutions: getResolutions,
            getResolution: getResolution,
            createResolution: createResolution,
            editResolution: editResolution,
            deleteResolution: deleteResolution
        };
    }
}());