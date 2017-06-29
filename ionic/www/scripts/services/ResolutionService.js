(function () {
    'use strict';

    var app = angular.module('app');
    app.factory('ResolutionService', ['$http', 'HandlingService', ResolutionService]);

    function ResolutionService($http, HandlingService) {

        var api = '/decisions';

        // Get all Decisions
        function getResolutions(offset, limit) {
            if (offset === undefined || limit === undefined) {
                offset = 0;
                limit = 0;
            }
            return $http({
                method: 'GET',
                url: api,
                params: {
                    limit: limit,
                    offset: offset
                }
            })
                .then(HandlingService.ReturnData)
                .catch(HandlingService.ReturnError);
        }

        // Get a specific Decision
        function getResolution(id) {
            return $http({
                method: 'GET',
                url: api + '/' + id
            })
                .then(HandlingService.ReturnData)
                .catch(HandlingService.ReturnError);
        }

        //Create a new Decision
        function createResolution(data) {
            return $http({
                method: 'POST',
                url: api,
                data: data
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }

        //Edit an existing Decision
        function editResolution(data) {
            return $http({
                method: 'PUT',
                url: api,
                data: data
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }

        return {
            getResolutions: getResolutions,
            getResolution: getResolution,
            createResolution: createResolution,
            editResolution: editResolution
        };
    }
}());