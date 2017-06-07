(function () {
    'use strict';

    var app = angular.module('app');
    app.factory('DataService', ['$http', '$q', DataService]);

    function DataService($http, $q) {
        return {
            getUsers: getUsers
        };

        function ReturnError(response) {
            return $q.reject('Error: ' + response.status + '; Response: ' + response);
        }

        function getUsers() {
            return $http({
                method: 'GET',
                url: '/users'
            })
                .then(function (response) {
                    return response;
                })
                .catch(ReturnError);
        }
    }
}());