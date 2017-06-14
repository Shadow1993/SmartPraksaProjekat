(function() {
    'use strict';

    var app = angular.module('app');
    app.factory('AuthorizeService', ['$http', 'HandlingService', AuthorizeService]);
    function AuthorizeService($http, HandlingService) {

        var api = '/login';

        function authorize(data) {
            return $http({
                method: 'POST',
                url: api,
                data: data
            })
                .then(HandlingService.ReturnSuccess)
                .then(HandlingService.ReturnData)
                .catch(HandlingService.ReturnError);
        }

        return {
            authorize: authorize
        };
    }
}());