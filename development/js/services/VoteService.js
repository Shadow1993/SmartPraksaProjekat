(function() {
    'use strict';

    var app = angular.module('app');
    app.factory('VoteService', ['$http', 'HandlingService', VoteService]);
    function VoteService($http, HandlingService) {
        var api = '/votes';

        //Create a new Vote
        function createVote(data) {
            return $http({
                method: 'POST',
                url: api,
                data: data
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }

        //Change an existing Vote
        function editVote(data) {
            return $http({
                method: 'PUT',
                url: api,
                data: data
            })
                .then(HandlingService.ReturnSuccess)
                .catch(HandlingService.ReturnError);
        }

        return {
            createVote: createVote,
            editVote: editVote
        };
    }
}());