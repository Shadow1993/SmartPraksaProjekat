(function() {
    'use strict';

    var app = angular.module('app');
    app.factory('DataService', ['$http', '$q', DataService]);

    function DataService($http, $q) {
        return {
            getData: getData
        };

        function getData() {
            return $http({
                method: 'GET',
                url: 'api/..'
            })
                .then(function(response) {
                    return response;
                })
                .catch(function(response) {
                    return $q.reject('Error: ' + response.status + '. ' + response);
                });
        }
    }
}());