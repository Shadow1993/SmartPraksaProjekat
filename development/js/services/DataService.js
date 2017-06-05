(function() {
    'use strict';

    var app = angular.module('app');
    app.factory('DataService', ['$http', '$q', DataService]);

    function DataService($http, $q) {
        return {
            getTest: getTest
        };

        function getTest() {
            return $http({
                method: 'GET',
                url: '/tryout'
            })
                .then(function(response) {
                    return response;
                })
                .catch(function(response) {
                    return $q.reject('Error: ' + response.status + '; Response: ' + response);
                });
        }
    }
}());